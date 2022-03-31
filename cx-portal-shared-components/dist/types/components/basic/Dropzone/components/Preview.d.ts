import { IPreviewProps, StatusValue } from 'react-dropzone-uploader';
declare type statusText = {
    [k in StatusValue]: string;
};
export interface previewProps {
    errorStatus: String[];
    statusText: Partial<statusText>;
}
export interface allPreviewProps extends IPreviewProps, previewProps {
}
export declare const Preview: ({ meta, statusText, fileWithMeta, canCancel, canRemove, canRestart, errorStatus, }: allPreviewProps) => JSX.Element;
export {};
