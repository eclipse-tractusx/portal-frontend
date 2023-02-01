/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

/**
 * tool to bundle and flatten the .d.ts files
 */
import * as path from 'path'
import ts from 'typescript'
import { createRequire } from 'module'
import MagicString from 'magic-string'

const dts = '.d.ts'
const formatHost = {
  gcd: () => ts.sys.getCurrentDirectory(),
  getNewLine: () => ts.sys.newLine,
  getCanonicalFileName: ts.sys.useCaseSensitiveFileNames
    ? (f) => f
    : (f) => f.toLowerCase(),
}
const DEFAULT_OPTIONS = {
  declaration: true,
  noEmit: false,
  emitDeclarationOnly: true,
  noEmitOnError: true,
  checkJs: false,
  declarationMap: false,
  skipLibCheck: true,
  preserveSymlinks: true,
  target: ts.ScriptTarget.ESNext,
}
const gco = (input, overrideOptions) => {
  const compilerOptions = { ...DEFAULT_OPTIONS, ...overrideOptions }
  let dirName = path.dirname(input)
  let dtsFiles = []
  const configPath = ts.findConfigFile(dirName, ts.sys.fileExists)
  if (!configPath) {
    return { dtsFiles, dirName, compilerOptions }
  }
  dirName = path.dirname(configPath)
  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile)
  if (error) {
    console.error(ts.formatDiagnostic(error, formatHost))
    return { dtsFiles, dirName, compilerOptions }
  }
  const { fileNames, options, errors } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    dirName
  )
  dtsFiles = fileNames.filter((name) => name.endsWith(dts))
  if (errors.length) {
    console.error(ts.formatDiagnostics(errors, formatHost))
    return { dtsFiles, dirName, compilerOptions }
  }
  return {
    dtsFiles,
    dirName,
    compilerOptions: {
      ...options,
      ...compilerOptions,
    },
  }
}
const createProgram$1 = (fileName, overrideOptions) => {
  const { dtsFiles, compilerOptions } = gco(fileName, overrideOptions)
  return ts.createProgram(
    [fileName].concat(Array.from(dtsFiles)),
    compilerOptions,
    ts.createCompilerHost(compilerOptions, true)
  )
}

const createPrograms = (input, overrideOptions) => {
  const programs = []
  let inputs = []
  let dtsFiles = new Set()
  let dirName = ''
  let compilerOptions = {}
  for (let main of input) {
    if (main.endsWith(dts)) {
      continue
    }
    main = path.resolve(main)
    const options = gco(main, overrideOptions)
    options.dtsFiles.forEach(dtsFiles.add, dtsFiles)
    if (!inputs.length) {
      inputs.push(main)
      ;({ dirName, compilerOptions } = options)
      continue
    }
    if (options.dirName === dirName) {
      inputs.push(main)
    } else {
      const host = ts.createCompilerHost(compilerOptions, true)
      const program = ts.createProgram(
        inputs.concat(Array.from(dtsFiles)),
        compilerOptions,
        host
      )
      programs.push(program)
      inputs = [main]
      ;({ dirName, compilerOptions } = options)
    }
  }
  if (inputs.length) {
    const host = ts.createCompilerHost(compilerOptions, true)
    const program = ts.createProgram(
      inputs.concat(Array.from(dtsFiles)),
      compilerOptions,
      host
    )
    programs.push(program)
  }
  return programs
}

const getCodeFrame = () => {
  let codeFrameColumns = undefined
  try {
    ;({ codeFrameColumns } = require('@babel/code-frame'))
    return codeFrameColumns
  } catch {
    try {
      const esmRequire = createRequire(import.meta.url)
      ;({ codeFrameColumns } = esmRequire('@babel/code-frame'))
      return codeFrameColumns
    } catch {}
  }
  return undefined
}
const getLocation = (node) => {
  const sourceFile = node.getSourceFile()
  const start = sourceFile.getLineAndCharacterOfPosition(node.getStart())
  const end = sourceFile.getLineAndCharacterOfPosition(node.getEnd())
  return {
    start: { line: start.line + 1, column: start.character + 1 },
    end: { line: end.line + 1, column: end.character + 1 },
  }
}
const frameNode = (node) => {
  const codeFrame = getCodeFrame()
  const sourceFile = node.getSourceFile()
  const code = sourceFile.getFullText()
  const location = getLocation(node)
  if (codeFrame) {
    return (
      '\n' +
      codeFrame(code, location, {
        highlightCode: true,
      })
    )
  } else {
    return `\n${location.start.line}:${location.start.column}: \`${node
      .getFullText()
      .trim()}\``
  }
}
class UnsupportedSyntaxError extends Error {
  constructor(node, message = 'Syntax not yet supported') {
    super(`${message}\n${frameNode(node)}`)
  }
}

class NF {
  constructor(sourceFile) {
    this.sourceFile = sourceFile
  }
  fn() {
    const namespaces = []
    const items = {}
    for (const node of this.sourceFile.statements) {
      const location = {
        start: node.getStart(),
        end: node.getEnd(),
      }
      if (ts.isEmptyStatement(node)) {
        namespaces.unshift({
          name: '',
          exports: [],
          location,
        })
        continue
      }
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        let { text } = node.moduleSpecifier
        if (
          text.startsWith('.') &&
          (text.endsWith('.d.ts') ||
            text.endsWith('.d.cts') ||
            text.endsWith('.d.mts'))
        ) {
          let start = node.moduleSpecifier.getStart() + 1
          let end = node.moduleSpecifier.getEnd() - 1
          namespaces.unshift({
            name: '',
            exports: [],
            location: {
              start,
              end,
            },
            textBeforeCodeAfter: text
              .replace(/\.d\.ts$/, '.js')
              .replace(/\.d\.cts$/, '.cjs')
              .replace(/\.d\.mts$/, '.mjs'),
          })
        }
      }
      if (
        ts.isModuleDeclaration(node) &&
        node.body &&
        ts.isModuleBlock(node.body)
      ) {
        for (const stmt of node.body.statements) {
          if (ts.isExportDeclaration(stmt) && stmt.exportClause) {
            if (ts.isNamespaceExport(stmt.exportClause)) {
              continue
            }
            for (const decl of stmt.exportClause.elements) {
              if (
                decl.propertyName &&
                decl.propertyName.getText() === decl.name.getText()
              ) {
                namespaces.unshift({
                  name: '',
                  exports: [],
                  location: {
                    start: decl.propertyName.getEnd(),
                    end: decl.name.getEnd(),
                  },
                })
              }
            }
          }
        }
      }
      if (ts.isClassDeclaration(node)) {
        items[node.name.getText()] = {
          type: 'class',
          generics: node.typeParameters,
        }
      } else if (ts.isFunctionDeclaration(node)) {
        items[node.name.getText()] = { type: 'function' }
      } else if (ts.isInterfaceDeclaration(node)) {
        items[node.name.getText()] = {
          type: 'interface',
          generics: node.typeParameters,
        }
      } else if (ts.isTypeAliasDeclaration(node)) {
        items[node.name.getText()] = {
          type: 'type',
          generics: node.typeParameters,
        }
      } else if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name)) {
        items[node.name.getText()] = { type: 'namespace' }
      } else if (ts.isEnumDeclaration(node)) {
        items[node.name.getText()] = { type: 'enum' }
      }
      if (!ts.isVariableStatement(node)) {
        continue
      }
      const { declarations } = node.declarationList
      if (declarations.length !== 1) {
        continue
      }
      const decl = declarations[0]
      const name = decl.name.getText()
      if (!decl.initializer || !ts.isCallExpression(decl.initializer)) {
        items[name] = { type: 'var' }
        continue
      }
      const obj = decl.initializer.arguments[0]
      if (
        !decl.initializer.expression
          .getFullText()
          .includes('/*#__PURE__*/Object.freeze') ||
        !ts.isObjectLiteralExpression(obj)
      ) {
        continue
      }
      const exports = []
      for (const prop of obj.properties) {
        if (
          !ts.isPropertyAssignment(prop) ||
          !(ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) ||
          (prop.name.text !== '__proto__' && !ts.isIdentifier(prop.initializer))
        ) {
          throw new UnsupportedSyntaxError(
            prop,
            'Expected a property assignment'
          )
        }
        if (prop.name.text === '__proto__') {
          continue
        }
        exports.push({
          exportedName: prop.name.text,
          localName: prop.initializer.getText(),
        })
      }

      namespaces.unshift({
        name,
        exports,
        location,
      })
    }
    return { namespaces, itemTypes: items }
  }
  fix() {
    let _a
    let code = this.sourceFile.getFullText()
    const { namespaces, itemTypes } = this.fn()
    for (const ns of namespaces) {
      const codeAfter = code.slice(ns.location.end)
      code = code.slice(0, ns.location.start)
      for (const { exportedName, localName } of ns.exports) {
        if (exportedName === localName) {
          const { type, generics } = itemTypes[localName] || {}
          if (type === 'interface' || type === 'type') {
            const typeParams = rtp(generics)
            code += `type ${ns.name}_${exportedName}${typeParams.in} = ${localName}${typeParams.out};\n`
          } else if (type === 'enum' || type === 'class') {
            const typeParams = rtp(generics)
            code += `type ${ns.name}_${exportedName}${typeParams.in} = ${localName}${typeParams.out};\n`
            code += `declare const ${ns.name}_${exportedName}: typeof ${localName};\n`
          } else {
            code += `declare const ${ns.name}_${exportedName}: typeof ${localName};\n`
          }
        }
      }
      if (ns.name) {
        code += `declare namespace ${ns.name} {\n`
        code += `  export {\n`
        for (const { exportedName, localName } of ns.exports) {
          if (exportedName === localName) {
            code += `    ${ns.name}_${exportedName} as ${exportedName},\n`
          } else {
            code += `    ${localName} as ${exportedName},\n`
          }
        }
        code += `  };\n`
        code += `}`
      }
      code += (_a = ns.textBeforeCodeAfter) !== null && _a !== void 0 ? _a : ''
      code += codeAfter
    }
    return code
  }
}
function rtp(typeParameters) {
  if (!typeParameters || !typeParameters.length) {
    return { in: '', out: '' }
  }
  return {
    in: `<${typeParameters.map((param) => param.getText()).join(', ')}>`,
    out: `<${typeParameters.map((param) => param.name.getText()).join(', ')}>`,
  }
}
let IDs = 1
function createProgram(node) {
  return withStartEnd(
    {
      type: 'Program',
      sourceType: 'module',
      body: [],
    },
    { start: node.getFullStart(), end: node.getEnd() }
  )
}
function createReference(id) {
  return {
    type: 'AssignmentPattern',
    left: {
      type: 'Identifier',
      name: String(IDs++),
    },
    right: id,
  }
}
function createIdentifier(node) {
  return withStartEnd(
    {
      type: 'Identifier',
      name: node.getText(),
    },
    node
  )
}
function cIIFE(range) {
  const fn = withStartEnd(
    {
      type: 'FunctionExpression',
      id: null,
      params: [],
      body: { type: 'BlockStatement', body: [] },
    },
    range
  )
  const iife = withStartEnd(
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: String(IDs++) },
        arguments: [fn],
        optional: false,
      },
    },
    range
  )
  return { fn, iife }
}
function cd(id, range) {
  return withStartEnd(
    {
      type: 'FunctionDeclaration',
      id: withStartEnd(
        {
          type: 'Identifier',
          name: ts.idText(id),
        },
        id
      ),
      params: [],
      body: { type: 'BlockStatement', body: [] },
    },
    range
  )
}
function ce(node) {
  if (ts.isLiteralExpression(node)) {
    return { type: 'Literal', value: node.text }
  }
  if (ts.isPropertyAccessExpression(node)) {
    if (ts.isPrivateIdentifier(node.name)) {
      throw new UnsupportedSyntaxError(node.name)
    }
    return withStartEnd(
      {
        type: 'MemberExpression',
        computed: false,
        optional: false,
        object: ce(node.expression),
        property: ce(node.name),
      },
      {
        start: node.expression.getStart(),
        end: node.name.getEnd(),
      }
    )
  }
  if (ts.isIdentifier(node)) {
    return createIdentifier(node)
  } else if (node.kind === ts.SyntaxKind.NullKeyword) {
    return { type: 'Literal', value: null }
  } else {
    throw new UnsupportedSyntaxError(node)
  }
}
function withStartEnd(esNode, nodeOrRange) {
  let range =
    'start' in nodeOrRange
      ? nodeOrRange
      : { start: nodeOrRange.getStart(), end: nodeOrRange.getEnd() }
  return Object.assign(esNode, range)
}
function matchesModifier(node, flags) {
  const nodeFlags = ts.getCombinedModifierFlags(node)
  return (nodeFlags & flags) === flags
}
function pp({ sourceFile }) {
  const code = new MagicString(sourceFile.getFullText())
  const declaredNames = new Set()
  const exportedNames = new Set()
  let defaultExport = ''
  const inlineImports = new Map()
  const nameRanges = new Map()
  for (const node of sourceFile.statements) {
    if (ts.isEmptyStatement(node)) {
      code.remove(node.getStart(), node.getEnd())
      continue
    }
    if (
      ts.isEnumDeclaration(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isClassDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isModuleDeclaration(node)
    ) {
      if (node.name) {
        const name = node.name.getText()
        declaredNames.add(name)

        if (matchesModifier(node, ts.ModifierFlags.ExportDefault)) {
          defaultExport = name
        } else if (matchesModifier(node, ts.ModifierFlags.Export)) {
          exportedNames.add(name)
        }
        if (!(node.flags & ts.NodeFlags.GlobalAugmentation)) {
          pushNamedNode(name, [getStart(node), getEnd(node)])
        }
      }
      if (ts.isModuleDeclaration(node)) {
        duplicateExports(code, node)
      }
      fixModifiers(code, node)
    } else if (ts.isVariableStatement(node)) {
      const { declarations } = node.declarationList
      const isExport = matchesModifier(node, ts.ModifierFlags.Export)
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const name = decl.name.getText()
          declaredNames.add(name)
          if (isExport) {
            exportedNames.add(name)
          }
        }
      }
      fixModifiers(code, node)
      if (declarations.length === 1) {
        const decl = declarations[0]
        if (ts.isIdentifier(decl.name)) {
          pushNamedNode(decl.name.getText(), [getStart(node), getEnd(node)])
        }
      } else {
        const decls = declarations.slice()
        const first = decls.shift()
        pushNamedNode(first.name.getText(), [getStart(node), first.getEnd()])
        for (const decl of decls) {
          if (ts.isIdentifier(decl.name)) {
            pushNamedNode(decl.name.getText(), [
              decl.getFullStart(),
              decl.getEnd(),
            ])
          }
        }
      }
      const { flags } = node.declarationList
      const type =
        flags & ts.NodeFlags.Let
          ? 'let'
          : flags & ts.NodeFlags.Const
          ? 'const'
          : 'var'
      const prefix = `declare ${type} `
      const list = node.declarationList
        .getChildren()
        .find((c) => c.kind === ts.SyntaxKind.SyntaxList)
        .getChildren()
      let commaPos = 0
      for (const node of list) {
        if (node.kind === ts.SyntaxKind.CommaToken) {
          commaPos = node.getStart()
          code.remove(commaPos, node.getEnd())
        } else if (commaPos) {
          code.appendLeft(commaPos, ';\n')
          const start = node.getFullStart()
          const slice = code.slice(start, node.getStart())
          let whitespace = slice.length - slice.trimStart().length
          if (whitespace) {
            code.overwrite(start, start + whitespace, prefix)
          } else {
            code.appendLeft(start, prefix)
          }
        }
      }
    }
  }
  for (const node of sourceFile.statements) {
    cii(node)
    if (!matchesModifier(node, ts.ModifierFlags.ExportDefault)) {
      continue
    }
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
      if (node.name) {
        continue
      }
      if (!defaultExport) {
        defaultExport = uniqName('export_default')
      }
      const children = node.getChildren()
      const idx = children.findIndex(
        (node) =>
          node.kind === ts.SyntaxKind.ClassKeyword ||
          node.kind === ts.SyntaxKind.FunctionKeyword
      )
      const token = children[idx]
      const nextToken = children[idx + 1]
      const isPunctuation =
        nextToken.kind >= ts.SyntaxKind.FirstPunctuation &&
        nextToken.kind <= ts.SyntaxKind.LastPunctuation
      if (isPunctuation) {
        code.appendLeft(nextToken.getStart(), defaultExport)
      } else {
        code.appendRight(token.getEnd(), ` ${defaultExport}`)
      }
    }
  }
  for (const ranges of nameRanges.values()) {
    const last = ranges.pop()
    const start = last[0]
    for (const node of ranges) {
      code.move(node[0], node[1], start)
    }
  }
  if (defaultExport) {
    code.append(`\nexport default ${defaultExport};\n`)
  }
  if (exportedNames.size) {
    code.append(`\nexport { ${[...exportedNames].join(', ')} };\n`)
  }
  for (const [fileId, importName] of inlineImports.entries()) {
    code.prepend(`import * as ${importName} from '${fileId}';\n`)
  }
  const lineStarts = sourceFile.getLineStarts()
  const typeReferences = new Set()
  for (const ref of sourceFile.typeReferenceDirectives) {
    typeReferences.add(ref.fileName)
    const { line } = sourceFile.getLineAndCharacterOfPosition(ref.pos)
    const start = lineStarts[line]
    let end = sourceFile.getLineEndOfPosition(ref.pos)
    if (code.slice(end, end + 1) === '\n') {
      end += 1
    }
    code.remove(start, end)
  }
  const fileReferences = new Set()
  for (const ref of sourceFile.referencedFiles) {
    fileReferences.add(
      path.join(path.dirname(sourceFile.fileName), ref.fileName)
    )
    const { line } = sourceFile.getLineAndCharacterOfPosition(ref.pos)
    const start = lineStarts[line]
    let end = sourceFile.getLineEndOfPosition(ref.pos)
    if (code.slice(end, end + 1) === '\n') {
      end += 1
    }
    code.remove(start, end)
  }
  return {
    code,
    typeReferences,
    fileReferences,
  }
  function cii(node) {
    ts.forEachChild(node, cii)
    if (ts.isImportTypeNode(node)) {
      if (
        !ts.isLiteralTypeNode(node.argument) ||
        !ts.isStringLiteral(node.argument.literal)
      ) {
        throw new UnsupportedSyntaxError(
          node,
          'inline imports should have a literal argument'
        )
      }
      const fileId = node.argument.literal.text
      const children = node.getChildren()
      const start = children
        .find((t) => t.kind === ts.SyntaxKind.ImportKeyword)
        .getStart()
      let end = node.getEnd()
      const token = children.find(
        (t) =>
          t.kind === ts.SyntaxKind.DotToken ||
          t.kind === ts.SyntaxKind.LessThanToken
      )
      if (token) {
        end = token.getStart()
      }
      const importName = cnsi(fileId)
      code.overwrite(start, end, importName)
    }
  }
  function cnsi(fileId) {
    let importName = inlineImports.get(fileId)
    if (!importName) {
      importName = uniqName(fileId.replace(/[^a-zA-Z0-9_$]/g, () => '_'))
      inlineImports.set(fileId, importName)
    }
    return importName
  }
  function uniqName(hint) {
    let name = hint
    while (declaredNames.has(name)) {
      name = `_${name}`
    }
    declaredNames.add(name)
    return name
  }
  function pushNamedNode(name, range) {
    let nodes = nameRanges.get(name)
    if (!nodes) {
      nodes = [range]
      nameRanges.set(name, nodes)
    } else {
      const last = nodes[nodes.length - 1]
      if (last[1] === range[0]) {
        last[1] = range[1]
      } else {
        nodes.push(range)
      }
    }
  }
}
function fixModifiers(code, node) {
  let _a
  let hasDeclare = false
  const needsDeclare =
    ts.isClassDeclaration(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isModuleDeclaration(node) ||
    ts.isVariableStatement(node)
  for (const mod of (_a = node.modifiers) !== null && _a !== void 0 ? _a : []) {
    switch (mod.kind) {
      case ts.SyntaxKind.ExportKeyword:
      case ts.SyntaxKind.DefaultKeyword:
        code.remove(mod.getStart(), mod.getEnd() + 1)
        break
      case ts.SyntaxKind.DeclareKeyword:
        hasDeclare = true
        break
      default:
    }
  }
  if (needsDeclare && !hasDeclare) {
    code.appendRight(node.getStart(), 'declare ')
  }
}
function duplicateExports(code, module) {
  if (!module.body || !ts.isModuleBlock(module.body)) {
    return
  }
  for (const node of module.body.statements) {
    if (ts.isExportDeclaration(node) && node.exportClause) {
      if (ts.isNamespaceExport(node.exportClause)) {
        continue
      }
      for (const decl of node.exportClause.elements) {
        if (!decl.propertyName) {
          code.appendLeft(decl.name.getEnd(), ` as ${decl.name.getText()}`)
        }
      }
    }
  }
}
function getStart(node) {
  const start = node.getFullStart()
  return start + (newlineAt(node, start) ? 1 : 0)
}
function getEnd(node) {
  const end = node.getEnd()
  return end + (newlineAt(node, end) ? 1 : 0)
}
function newlineAt(node, idx) {
  return node.getSourceFile().getFullText()[idx] === '\n'
}
const IGNORE_TYPENODES = new Set([
  ts.SyntaxKind.LiteralType,
  ts.SyntaxKind.VoidKeyword,
  ts.SyntaxKind.UnknownKeyword,
  ts.SyntaxKind.AnyKeyword,
  ts.SyntaxKind.BooleanKeyword,
  ts.SyntaxKind.NumberKeyword,
  ts.SyntaxKind.StringKeyword,
  ts.SyntaxKind.ObjectKeyword,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.UndefinedKeyword,
  ts.SyntaxKind.SymbolKeyword,
  ts.SyntaxKind.NeverKeyword,
  ts.SyntaxKind.ThisKeyword,
  ts.SyntaxKind.ThisType,
  ts.SyntaxKind.BigIntKeyword,
])
class DeclarationScope {
  constructor({ id, range }) {
    this.scopes = []
    if (id) {
      this.declaration = cd(id, range)
    } else {
      const { iife, fn } = cIIFE(range)
      this.iife = iife
      this.declaration = fn
    }
  }
  pushScope() {
    this.scopes.push(new Set())
  }
  popScope(n = 1) {
    for (let i = 0; i < n; i++) {
      this.scopes.pop()
    }
  }
  pushTypeVariable(id) {
    let _a
    const name = id.getText()
    ;(_a = this.scopes[this.scopes.length - 1]) === null || _a === void 0
      ? void 0
      : _a.add(name)
  }
  pushRaw(expr) {
    this.declaration.params.push(expr)
  }
  pushReference(id) {
    let name
    if (id.type === 'Identifier') {
      name = id.name
    } else if (id.type === 'MemberExpression') {
      if (id.object.type === 'Identifier') {
        name = id.object.name
      }
    }
    if (name) {
      for (const scope of this.scopes) {
        if (scope.has(name)) {
          return
        }
      }
    }
    this.pushRaw(createReference(id))
  }
  pir(id) {
    this.pushReference(createIdentifier(id))
  }
  cen(node) {
    if (ts.isIdentifier(node)) {
      return createIdentifier(node)
    }
    return withStartEnd(
      {
        type: 'MemberExpression',
        computed: false,
        optional: false,
        object: this.cen(node.left),
        property: createIdentifier(node.right),
      },
      node
    )
  }
  cpa(node) {
    if (
      !ts.isIdentifier(node.expression) &&
      !ts.isPropertyAccessExpression(node.expression)
    ) {
      throw new UnsupportedSyntaxError(node.expression)
    }
    if (ts.isPrivateIdentifier(node.name)) {
      throw new UnsupportedSyntaxError(node.name)
    }
    let object = ts.isIdentifier(node.expression)
      ? createIdentifier(node.expression)
      : this.cpa(node.expression)
    return withStartEnd(
      {
        type: 'MemberExpression',
        computed: false,
        optional: false,
        object,
        property: createIdentifier(node.name),
      },
      node
    )
  }
  ccpn(node) {
    if (!node.name || !ts.isComputedPropertyName(node.name)) {
      return
    }
    const { expression } = node.name
    if (ts.isLiteralExpression(expression)) {
      return
    }
    if (ts.isIdentifier(expression)) {
      return this.pushReference(createIdentifier(expression))
    }
    if (ts.isPropertyAccessExpression(expression)) {
      return this.pushReference(this.cpa(expression))
    }
    throw new UnsupportedSyntaxError(expression)
  }
  cpat(node) {
    this.ccpn(node)
    const typeVariables = this.ctp(node.typeParameters)
    for (const param of node.parameters) {
      this.ctn(param.type)
    }
    this.ctn(node.type)
    this.popScope(typeVariables)
  }
  chc(node) {
    for (const heritage of node.heritageClauses || []) {
      for (const type of heritage.types) {
        this.pushReference(ce(type.expression))
        this.cta(type)
      }
    }
  }
  cta(node) {
    if (!node.typeArguments) {
      return
    }
    for (const arg of node.typeArguments) {
      this.ctn(arg)
    }
  }
  cm(members) {
    for (const node of members) {
      if (
        ts.isPropertyDeclaration(node) ||
        ts.isPropertySignature(node) ||
        ts.isIndexSignatureDeclaration(node)
      ) {
        this.ccpn(node)
        this.ctn(node.type)
        continue
      }
      if (
        ts.isMethodDeclaration(node) ||
        ts.isMethodSignature(node) ||
        ts.isConstructorDeclaration(node) ||
        ts.isConstructSignatureDeclaration(node) ||
        ts.isCallSignatureDeclaration(node) ||
        ts.isGetAccessorDeclaration(node) ||
        ts.isSetAccessorDeclaration(node)
      ) {
        this.cpat(node)
      } else {
        throw new UnsupportedSyntaxError(node)
      }
    }
  }
  ctp(params) {
    if (!params) {
      return 0
    }
    for (const node of params) {
      this.ctn(node.constraint)
      this.ctn(node.default)
      this.pushScope()
      this.pushTypeVariable(node.name)
    }
    return params.length
  }
  ctn(node) {
    if (!node) {
      return
    }
    if (IGNORE_TYPENODES.has(node.kind)) {
      return
    }
    if (ts.isTypeReferenceNode(node)) {
      this.pushReference(this.cen(node.typeName))
      this.cta(node)
      return
    }
    if (ts.isTypeLiteralNode(node)) {
      return this.cm(node.members)
    }
    if (ts.isArrayTypeNode(node)) {
      return this.ctn(node.elementType)
    }
    if (ts.isTupleTypeNode(node)) {
      for (const type of node.elements) {
        this.ctn(type)
      }
      return
    }
    if (
      ts.isNamedTupleMember(node) ||
      ts.isParenthesizedTypeNode(node) ||
      ts.isTypeOperatorNode(node) ||
      ts.isTypePredicateNode(node)
    ) {
      return this.ctn(node.type)
    }
    if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
      for (const type of node.types) {
        this.ctn(type)
      }
      return
    }
    if (ts.isMappedTypeNode(node)) {
      const { typeParameter, type, nameType } = node
      this.ctn(typeParameter.constraint)
      this.pushScope()
      this.pushTypeVariable(typeParameter.name)
      this.ctn(type)
      if (nameType) {
        this.ctn(nameType)
      }
      this.popScope()
      return
    }
    if (ts.isConditionalTypeNode(node)) {
      this.ctn(node.checkType)
      this.pushScope()
      this.ctn(node.extendsType)
      this.ctn(node.trueType)
      this.ctn(node.falseType)
      this.popScope()
      return
    }
    if (ts.isIndexedAccessTypeNode(node)) {
      this.ctn(node.objectType)
      this.ctn(node.indexType)
      return
    }
    if (ts.isFunctionOrConstructorTypeNode(node)) {
      this.cpat(node)
      return
    }
    if (ts.isTypeQueryNode(node)) {
      this.pushReference(this.cen(node.exprName))
      return
    }
    if (ts.isRestTypeNode(node)) {
      this.ctn(node.type)
      return
    }
    if (ts.isOptionalTypeNode(node)) {
      this.ctn(node.type)
      return
    }
    if (ts.isTemplateLiteralTypeNode(node)) {
      for (const span of node.templateSpans) {
        this.ctn(span.type)
      }
      return
    }
    if (ts.isInferTypeNode(node)) {
      this.pushTypeVariable(node.typeParameter.name)
      return
    } else {
      throw new UnsupportedSyntaxError(node)
    }
  }
  cn(node, relaxedModuleBlock = false) {
    this.pushScope()
    if (relaxedModuleBlock && node.body && ts.isModuleDeclaration(node.body)) {
      this.cn(node.body, true)
      return
    }
    if (!node.body || !ts.isModuleBlock(node.body)) {
      throw new UnsupportedSyntaxError(
        node,
        `namespace must have a 'ModuleBlock' body.`
      )
    }
    const { statements } = node.body

    for (const stmt of statements) {
      if (
        ts.isEnumDeclaration(stmt) ||
        ts.isFunctionDeclaration(stmt) ||
        ts.isClassDeclaration(stmt) ||
        ts.isInterfaceDeclaration(stmt) ||
        ts.isTypeAliasDeclaration(stmt) ||
        ts.isModuleDeclaration(stmt)
      ) {
        if (stmt.name && ts.isIdentifier(stmt.name)) {
          this.pushTypeVariable(stmt.name)
        } else {
          throw new UnsupportedSyntaxError(
            stmt,
            `non-Identifier name not supported`
          )
        }
        continue
      }
      if (ts.isVariableStatement(stmt)) {
        for (const decl of stmt.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            this.pushTypeVariable(decl.name)
          } else {
            throw new UnsupportedSyntaxError(
              decl,
              `non-Identifier name not supported`
            )
          }
        }
        continue
      }
      if (ts.isExportDeclaration(stmt));
      else {
        throw new UnsupportedSyntaxError(
          stmt,
          `namespace child (hoisting) not supported yet`
        )
      }
    }
    for (const stmt of statements) {
      if (ts.isVariableStatement(stmt)) {
        for (const decl of stmt.declarationList.declarations) {
          if (decl.type) {
            this.ctn(decl.type)
          }
        }
        continue
      }
      if (ts.isFunctionDeclaration(stmt)) {
        this.cpat(stmt)
        continue
      }
      if (ts.isInterfaceDeclaration(stmt) || ts.isClassDeclaration(stmt)) {
        const typeVariables = this.ctp(stmt.typeParameters)
        this.chc(stmt)
        this.cm(stmt.members)
        this.popScope(typeVariables)
        continue
      }
      if (ts.isTypeAliasDeclaration(stmt)) {
        const typeVariables = this.ctp(stmt.typeParameters)
        this.ctn(stmt.type)
        this.popScope(typeVariables)
        continue
      }
      if (ts.isModuleDeclaration(stmt)) {
        this.cn(stmt, relaxedModuleBlock)
        continue
      }
      if (ts.isEnumDeclaration(stmt)) {
        continue
      }
      if (ts.isExportDeclaration(stmt)) {
        if (stmt.exportClause) {
          if (ts.isNamespaceExport(stmt.exportClause)) {
            throw new UnsupportedSyntaxError(stmt.exportClause)
          }
          for (const decl of stmt.exportClause.elements) {
            const id = decl.propertyName || decl.name
            this.pir(id)
          }
        }
      } else {
        throw new UnsupportedSyntaxError(
          stmt,
          `namespace child (walking) not supported yet`
        )
      }
    }
    this.popScope()
  }
}
function convert({ sourceFile }) {
  const transformer = new Transformer(sourceFile)
  return transformer.transform()
}
class Transformer {
  constructor(sourceFile) {
    this.sourceFile = sourceFile
    this.declarations = new Map()
    this.ast = createProgram(sourceFile)
    for (const stmt of sourceFile.statements) {
      this.cs(stmt)
    }
  }
  transform() {
    return {
      ast: this.ast,
    }
  }
  ps(node) {
    this.ast.body.push(node)
  }
  cd(node, id) {
    const range = { start: node.getFullStart(), end: node.getEnd() }
    if (!id) {
      const scope = new DeclarationScope({ range })
      this.ps(scope.iife)
      return scope
    }
    const name = id.getText()
    const scope = new DeclarationScope({ id, range })
    const existingScope = this.declarations.get(name)
    if (existingScope) {
      existingScope.pir(id)
      existingScope.declaration.end = range.end
      let selfIdx = this.ast.body.findIndex(
        (node) => node === existingScope.declaration
      )
      for (let i = selfIdx + 1; i < this.ast.body.length; i++) {
        const decl = this.ast.body[i]
        decl.start = decl.end = range.end
      }
    } else {
      this.ps(scope.declaration)
      this.declarations.set(name, scope)
    }
    return existingScope || scope
  }
  cs(node) {
    if (ts.isEnumDeclaration(node)) {
      return this.ced(node)
    }
    if (ts.isFunctionDeclaration(node)) {
      return this.cfd(node)
    }
    if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
      return this.ccoi(node)
    }
    if (ts.isTypeAliasDeclaration(node)) {
      return this.ctad(node)
    }
    if (ts.isVariableStatement(node)) {
      return this.cvs(node)
    }
    if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
      return this.cexd(node)
    }
    if (ts.isModuleDeclaration(node)) {
      return this.cnd(node)
    }
    if (node.kind === ts.SyntaxKind.NamespaceExportDeclaration) {
      return this.rs(node)
    }
    if (ts.isImportDeclaration(node) || ts.isImportEqualsDeclaration(node)) {
      return this.cimd(node)
    } else {
      throw new UnsupportedSyntaxError(node)
    }
  }
  rs(node) {
    this.ps(
      withStartEnd(
        {
          type: 'ExpressionStatement',
          expression: { type: 'Literal', value: 'pls remove me' },
        },
        node
      )
    )
  }
  cnd(node) {
    const isGlobalAugmentation = node.flags & ts.NodeFlags.GlobalAugmentation
    if (isGlobalAugmentation || !ts.isIdentifier(node.name)) {
      const scope = this.cd(node)
      scope.cn(node, true)
      return
    }
    const scope = this.cd(node, node.name)
    scope.pir(node.name)
    scope.cn(node)
  }
  ced(node) {
    const scope = this.cd(node, node.name)
    scope.pir(node.name)
  }
  cfd(node) {
    if (!node.name) {
      throw new UnsupportedSyntaxError(
        node,
        `FunctionDeclaration should have a name`
      )
    }
    const scope = this.cd(node, node.name)
    scope.pir(node.name)
    scope.cpat(node)
  }
  ccoi(node) {
    if (!node.name) {
      throw new UnsupportedSyntaxError(
        node,
        `ClassDeclaration / InterfaceDeclaration should have a name`
      )
    }
    const scope = this.cd(node, node.name)
    const typeVariables = scope.ctp(node.typeParameters)
    scope.chc(node)
    scope.cm(node.members)
    scope.popScope(typeVariables)
  }
  ctad(node) {
    const scope = this.cd(node, node.name)
    const typeVariables = scope.ctp(node.typeParameters)
    scope.ctn(node.type)
    scope.popScope(typeVariables)
  }
  cvs(node) {
    const { declarations } = node.declarationList
    if (declarations.length !== 1) {
      throw new UnsupportedSyntaxError(
        node,
        `VariableStatement with more than one declaration not yet supported`
      )
    }
    for (const decl of declarations) {
      if (!ts.isIdentifier(decl.name)) {
        throw new UnsupportedSyntaxError(
          node,
          `VariableDeclaration must have a name`
        )
      }
      const scope = this.cd(node, decl.name)
      scope.ctn(decl.type)
    }
  }
  cexd(node) {
    if (ts.isExportAssignment(node)) {
      this.ps(
        withStartEnd(
          {
            type: 'ExportDefaultDeclaration',
            declaration: ce(node.expression),
          },
          node
        )
      )
      return
    }
    const source = node.moduleSpecifier ? ce(node.moduleSpecifier) : undefined
    if (!node.exportClause) {
      this.ps(
        withStartEnd(
          {
            type: 'ExportAllDeclaration',
            source,
            exported: null,
          },
          node
        )
      )
    } else if (ts.isNamespaceExport(node.exportClause)) {
      this.ps(
        withStartEnd(
          {
            type: 'ExportAllDeclaration',
            source,
            exported: createIdentifier(node.exportClause.name),
          },
          node
        )
      )
    } else {
      const specifiers = []
      for (const elem of node.exportClause.elements) {
        specifiers.push(this.cexs(elem))
      }
      this.ps(
        withStartEnd(
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers,
            source,
          },
          node
        )
      )
    }
  }
  cimd(node) {
    if (ts.isImportEqualsDeclaration(node)) {
      if (!ts.isExternalModuleReference(node.moduleReference)) {
        throw new UnsupportedSyntaxError(
          node,
          'ImportEquals should have a literal source.'
        )
      }
      this.ps(
        withStartEnd(
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: createIdentifier(node.name),
              },
            ],
            source: ce(node.moduleReference.expression),
          },
          node
        )
      )
      return
    }
    const source = ce(node.moduleSpecifier)
    const specifiers =
      node.importClause && node.importClause.namedBindings
        ? this.cnib(node.importClause.namedBindings)
        : []
    if (node.importClause && node.importClause.name) {
      specifiers.push({
        type: 'ImportDefaultSpecifier',
        local: createIdentifier(node.importClause.name),
      })
    }
    this.ps(
      withStartEnd(
        {
          type: 'ImportDeclaration',
          specifiers,
          source,
        },
        node
      )
    )
  }
  cnib(node) {
    if (ts.isNamedImports(node)) {
      return node.elements.map((el) => {
        const local = createIdentifier(el.name)
        const imported = el.propertyName
          ? createIdentifier(el.propertyName)
          : local
        return {
          type: 'ImportSpecifier',
          local,
          imported,
        }
      })
    }
    return [
      {
        type: 'ImportNamespaceSpecifier',
        local: createIdentifier(node.name),
      },
    ]
  }
  cexs(node) {
    const exported = createIdentifier(node.name)
    return {
      type: 'ExportSpecifier',
      exported: exported,
      local: node.propertyName ? createIdentifier(node.propertyName) : exported,
    }
  }
}
function parse(fileName, code) {
  return ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true)
}
const transform = () => {
  const allTypeReferences = new Map()
  const allFileReferences = new Map()
  return {
    name: 'dts-transform',
    options(options) {
      const { onwarn } = options
      return {
        ...options,
        onwarn(warning, warn) {
          if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            if (onwarn) {
              onwarn(warning, warn)
            } else {
              warn(warning)
            }
          }
        },
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: true,
          unknownGlobalSideEffects: false,
        },
      }
    },
    outputOptions(options) {
      return {
        ...options,
        chunkFileNames: options.chunkFileNames || '[name]-[hash].d.ts',
        entryFileNames: options.entryFileNames || '[name].d.ts',
        format: 'es',
        exports: 'named',
        compact: false,
        freeze: true,
        interop: false,
        namespaceToStringTag: false,
        strict: false,
      }
    },
    transform(code, fileName) {
      let sourceFile = parse(fileName, code)
      const pped = pp({ sourceFile })

      allTypeReferences.set(sourceFile.fileName, pped.typeReferences)
      allFileReferences.set(sourceFile.fileName, pped.fileReferences)
      code = pped.code.toString()
      sourceFile = parse(fileName, code)
      const converted = convert({ sourceFile })
      if (process.env.DTS_DUMP_AST) {
        console.log(fileName)
        console.log(code)
        console.log(JSON.stringify(converted.ast.body, undefined, 2))
      }
      return { code, ast: converted.ast, map: pped.code.generateMap() }
    },
    renderChunk(code, chunk, options) {
      const source = parse(chunk.fileName, code)
      const fixer = new NF(source)
      const typeReferences = new Set()
      const fileReferences = new Set()
      for (const fileName of Object.keys(chunk.modules)) {
        for (const ref of allTypeReferences.get(
          fileName.split('\\').join('/')
        ) || []) {
          typeReferences.add(ref)
        }
        for (const ref of allFileReferences.get(
          fileName.split('\\').join('/')
        ) || []) {
          const chunkFolder =
            (options.file && path.dirname(options.file)) ||
            (chunk.facadeModuleId && path.dirname(chunk.facadeModuleId)) ||
            '.'
          let targetRelPath = path
            .relative(chunkFolder, ref)
            .split('\\')
            .join('/')
          if (targetRelPath[0] !== '.') {
            targetRelPath = './' + targetRelPath
          }
          fileReferences.add(targetRelPath)
        }
      }
      code = writeBlock(
        Array.from(fileReferences, (ref) => `/// <reference path='${ref}' />`)
      )
      code += writeBlock(
        Array.from(typeReferences, (ref) => `/// <reference types='${ref}' />`)
      )
      code += fixer.fix()
      return { code, map: { mappings: '' } }
    },
  }
}
function writeBlock(codes) {
  if (codes.length) {
    return codes.join('\n') + '\n'
  }
  return ''
}
const tsx = /\.(t|j)sx?$/
const plugin = (options = {}) => {
  const transformPlugin = transform()
  const { respectExternal = false, compilerOptions = {} } = options
  let programs = []
  function getModule(fileName) {
    let source
    let program
    if (!programs.length && fileName.endsWith(dts)) {
      source = true
    } else {
      program = programs.find((p) => (source = p.getSourceFile(fileName)))
      if (!program && ts.sys.fileExists(fileName)) {
        programs.push((program = createProgram$1(fileName, compilerOptions)))
        source = program.getSourceFile(fileName)
      }
    }
    return { source, program }
  }
  return {
    name: 'dts',
    options(options) {
      let { input = [] } = options
      if (!Array.isArray(input)) {
        input = typeof input === 'string' ? [input] : Object.values(input)
      } else if (input.length > 1) {
        options.input = {}
        for (const filename of input) {
          let name = filename.replace(/((\.d)?\.(t|j)sx?)$/, '')
          if (path.isAbsolute(filename)) {
            name = path.basename(name)
          } else {
            name = path.normalize(name)
          }
          options.input[name] = filename
        }
      }
      programs = createPrograms(Object.values(input), compilerOptions)
      return transformPlugin.options.call(this, options)
    },
    outputOptions: transformPlugin.outputOptions,
    transform(code, id) {
      const transformFile = (source, id) => {
        if (typeof source === 'object') {
          code = source.getFullText()
        }
        return transformPlugin.transform.call(this, code, id)
      }
      if (!tsx.test(id)) {
        return null
      }
      if (id.endsWith(dts)) {
        const { source } = getModule(id)
        return source ? transformFile(source, id) : null
      }

      const declarationId = id.replace(tsx, dts)
      let module = getModule(declarationId)
      if (module.source) {
        return transformFile(module.source, declarationId)
      }

      module = getModule(id)
      if (typeof module.source != 'object' || !module.program) {
        return null
      }
      let generated
      const { emitSkipped, diagnostics } = module.program.emit(
        module.source,
        (_, declarationText) => {
          code = declarationText
          generated = transformFile(true, declarationId)
        },
        undefined,
        true
      )
      if (emitSkipped) {
        const errors = diagnostics.filter(
          (diag) => diag.category === ts.DiagnosticCategory.Error
        )
        if (errors.length) {
          console.error(ts.formatDiagnostics(errors, formatHost))
          this.error('Failed to compile. Check the logs above.')
        }
      }
      return generated
    },
    resolveId(source, importer) {
      if (!importer) return
      importer = importer.split('\\').join('/')
      const { resolvedModule } = ts.nodeModuleNameResolver(
        source,
        importer,
        compilerOptions,
        ts.sys
      )
      if (!resolvedModule) return
      if (!respectExternal && resolvedModule.isExternalLibraryImport)
        return { id: source, external: true }
      else return { id: path.resolve(resolvedModule.resolvedFileName) }
    },
    renderChunk: transformPlugin.renderChunk,
  }
}

export { plugin as default }
