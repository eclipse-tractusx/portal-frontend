import { IDropzoneProps } from 'react-dropzone-uploader';
import { previewProps } from './components/Preview';
interface DropzoneProps extends IDropzoneProps, previewProps {
    fileTypes: string;
    title: string;
    subTitle: string;
    maxFilesCount: number;
}
export declare const Dropzone: ({ title, subTitle, fileTypes, maxFilesCount, getUploadParams, onSubmit, onChangeStatus, statusText, errorStatus, }: DropzoneProps) => JSX.Element;
export {};
