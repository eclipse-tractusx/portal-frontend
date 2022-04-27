export const data = {
  "totalItems": 475,
  "currentPage": 0,
  "totalPages": 48,
  "itemCount": 10,
  "items": [
      {
          "description": [
              {
                  "language": "en",
                  "text": "The shell for a vehicle"
              }
          ],
          "globalAssetId": {
              "value": [
                  "VIN1230941209423423"
              ]
          },
          "idShort": "future concept x",
          "identification": "882fc530-b69b-4707-95f6-5dbc5e9baaa8",
          "specificAssetIds": [
              {
                  "key": "engineserialid",
                  "value": "12309481209312"
              }
          ],
          "submodelDescriptors": []
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "The shell for a brake system"
              }
          ],
          "idShort": "brake_dt_2019_snr.asm",
          "identification": "urn:twin:com.tsystems#3c7556f7-6956-4360-8036-d03e5a79c3c8",
          "specificAssetIds": [
              {
                  "key": "urn:twin:com.tsystems#",
                  "value": "3c7556f7-6956-4360-8036-d03e5a79c3c8"
              },
              {
                  "key": "http://pwc.t-systems.com/datamodel/common",
                  "value": "0000000251"
              },
              {
                  "key": "VR:wt.part.WTPart",
                  "value": "25054146@nis11c130.epdm-d.edm.dsh.de"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "brake-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#4a738a24-b7d8-4989-9cd6-387772f40565",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-windchill&representation=bom-aspect&artifact=brake",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "brake-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#dae4d249-6d66-4818-b576-bf52f3b9ae90",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-windchill&representation=material-aspect&artifact=brake",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "BMW 520e Plugin-Hybrid"
              }
          ],
          "idShort": "BMW 520e Plugin-Hybrid",
          "identification": "urn:twin:com.BMW#69ab0d77-c981-41fe-8c0f-bd0c8256228d",
          "specificAssetIds": [
              {
                  "key": "urn:twin:com.BMW#",
                  "value": "69ab0d77-c981-41fe-8c0f-bd0c8256228d"
              },
              {
                  "key": "urn:part:com.BMW:part-number",
                  "value": "31BK"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "ABOlhjidrBYndEZPJ9xXZzH2MbSBHI6EzfO6UF8AnnHvFKWBTTO5MrhHXUgTHmNhz9SAn3qxGSIbLGI14K3FhHGzVNMawdOeaItJ0EeNy4Mi3g"
              },
              {
                  "key": "urn:iso:std:iso:4030:ed-3:v1:en",
                  "value": "5UXFE43588L890072"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#69ab0d77-c981-41fe-8c0f-bd0c8256228d",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=BMW&number=31BK",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#69ab0d77-c981-41fe-8c0f-bd0c8256228d",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=BMW&serial=ABOlhjidrBYndEZPJ9xXZzH2MbSBHI6EzfO6UF8AnnHvFKWBTTO5MrhHXUgTHmNhz9SAn3qxGSIbLGI14K3FhHGzVNMawdOeaItJ0EeNy4Mi3g",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "LU GETRIEBE GA8L51CZ B48B20M1  CODE SXJ8"
              }
          ],
          "idShort": "LU GETRIEBE GA8L51CZ B48B20M1  CODE SXJ8",
          "identification": "urn:twin:com.ZF#e0780908-d8c2-44d5-b26b-596a9177be22",
          "specificAssetIds": [
              {
                  "key": "urn:part:com.ZF:part-number",
                  "value": "5A047C7-01"
              },
              {
                  "key": "urn:twin:com.ZF#",
                  "value": "e0780908-d8c2-44d5-b26b-596a9177be22"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "X1317266J8"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#e0780908-d8c2-44d5-b26b-596a9177be22",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=ZF&serial=X1317266J8",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#e0780908-d8c2-44d5-b26b-596a9177be22",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=ZF&number=5A047C7-01",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "ZB LU HVS SP41 G30 G31"
              }
          ],
          "idShort": "ZB LU HVS SP41 G30 G31",
          "identification": "urn:twin:com.BMW#7ddd576e-e42b-42b7-85fd-a8c87e3ab54a",
          "specificAssetIds": [
              {
                  "key": "urn:part:com.BMW:part-number",
                  "value": "8849262-01"
              },
              {
                  "key": "urn:twin:com.BMW#",
                  "value": "7ddd576e-e42b-42b7-85fd-a8c87e3ab54a"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "T588492620121B1872B018562515271"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#7ddd576e-e42b-42b7-85fd-a8c87e3ab54a",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=BMW&serial=T588492620121B1872B018562515271",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#7ddd576e-e42b-42b7-85fd-a8c87e3ab54a",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=BMW&number=8849262-01",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "ZB ZELLMODUL PHEV1 34AH NEG 16S1P U3"
              }
          ],
          "idShort": "ZB ZELLMODUL PHEV1 34AH NEG 16S1P U3",
          "identification": "urn:twin:com.BMW#80fd0ee9-44d1-4004-8262-e41112f8a673",
          "specificAssetIds": [
              {
                  "key": "urn:twin:com.BMW#",
                  "value": "80fd0ee9-44d1-4004-8262-e41112f8a673"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "8840838046251527121070231065"
              },
              {
                  "key": "urn:part:com.BMW:part-number",
                  "value": "8840838-04"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#80fd0ee9-44d1-4004-8262-e41112f8a673",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=BMW&number=8840838-04",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#80fd0ee9-44d1-4004-8262-e41112f8a673",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=BMW&serial=8840838046251527121070231065",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT"
              }
          ],
          "idShort": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT",
          "identification": "urn:twin:com.SAMSUNG#178b5d86-fe5d-4815-856c-d97ac36977c3",
          "specificAssetIds": [
              {
                  "key": "urn:twin:com.SAMSUNG#",
                  "value": "178b5d86-fe5d-4815-856c-d97ac36977c3"
              },
              {
                  "key": "urn:part:com.SAMSUNG:part-number",
                  "value": "8844604-01"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "884460401223478102102142746000936082"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#178b5d86-fe5d-4815-856c-d97ac36977c3",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=SAMSUNG&serial=884460401223478102102142746000936082",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#178b5d86-fe5d-4815-856c-d97ac36977c3",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=SAMSUNG&number=8844604-01",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT"
              }
          ],
          "idShort": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT",
          "identification": "urn:twin:com.SAMSUNG#2ec19f61-2648-47fb-81ea-a391bf420c01",
          "specificAssetIds": [
              {
                  "key": "urn:part:com.SAMSUNG:part-number",
                  "value": "8844604-01"
              },
              {
                  "key": "urn:twin:com.SAMSUNG#",
                  "value": "2ec19f61-2648-47fb-81ea-a391bf420c01"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "884460401223478102102142751200936072"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#2ec19f61-2648-47fb-81ea-a391bf420c01",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=SAMSUNG&serial=884460401223478102102142751200936072",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#2ec19f61-2648-47fb-81ea-a391bf420c01",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=SAMSUNG&number=8844604-01",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT"
              }
          ],
          "idShort": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT",
          "identification": "urn:twin:com.SAMSUNG#9a336a90-09bf-450d-8233-23e1950323c1",
          "specificAssetIds": [
              {
                  "key": "urn:part:com.SAMSUNG:part-number",
                  "value": "8844604-01"
              },
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "884460401223478102102142751400936072"
              },
              {
                  "key": "urn:twin:com.SAMSUNG#",
                  "value": "9a336a90-09bf-450d-8233-23e1950323c1"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#9a336a90-09bf-450d-8233-23e1950323c1",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=SAMSUNG&serial=884460401223478102102142751400936072",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#9a336a90-09bf-450d-8233-23e1950323c1",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=SAMSUNG&number=8844604-01",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "description": [
              {
                  "language": "en",
                  "text": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT"
              }
          ],
          "idShort": "LI-ION ZELLE Z10 PHEV1 34AH U3.0 LF2 RPT",
          "identification": "urn:twin:com.SAMSUNG#4c6f7338-61e3-4889-8a90-60dfebde8d47",
          "specificAssetIds": [
              {
                  "key": "urn:serial:com.BMW:part-serial",
                  "value": "884460401223478102102142751800936082"
              },
              {
                  "key": "urn:part:com.SAMSUNG:part-number",
                  "value": "8844604-01"
              },
              {
                  "key": "urn:twin:com.SAMSUNG#",
                  "value": "4c6f7338-61e3-4889-8a90-60dfebde8d47"
              }
          ],
          "submodelDescriptors": [
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Traceability Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-traceability",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Traceability#4c6f7338-61e3-4889-8a90-60dfebde8d47",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Traceability"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=bom-aspect&artifact=bom-vehicle&manufacturer=SAMSUNG&serial=884460401223478102102142751800936082",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              },
              {
                  "description": [
                      {
                          "language": "en",
                          "text": "Catena-X Material Aspect Implementation"
                      }
                  ],
                  "idShort": "sql-material",
                  "identification": "urn:bamm:com.catenaX:0.0.1#Material#4c6f7338-61e3-4889-8a90-60dfebde8d47",
                  "semanticId": {
                      "value": [
                          "urn:bamm:com.catenaX:0.0.1#Material"
                      ]
                  },
                  "endpoints": [
                      {
                          "interface": "IDS",
                          "protocolInformation": {
                              "endpointAddress": "urn:Vocabulary:com.ids:Connector?recipient=https://w3id.org/idsa/autogen/connectorEndpoint/a73d2202-cb77-41db-a3a6-05ed251c0b&offer=offer-tdm&representation=material-aspect&artifact=material-vehicle&manufacturer=SAMSUNG&number=8844604-01",
                              "endpointProtocol": "GET",
                              "endpointProtocolVersion": "1.0"
                          }
                      }
                  ]
              }
          ]
      }
  ]
}