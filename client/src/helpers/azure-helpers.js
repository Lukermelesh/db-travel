import { blobUri, sasKey, container } from '../constants/azure-blob-storage';

export const uploadFile = file => {
  const blobService = window.AzureStorage.Blob.createBlobServiceWithSas(
    blobUri,
    sasKey
  ).withFilter(new window.AzureStorage.Blob.ExponentialRetryPolicyFilter());
  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromBrowserFile(
      container,
      file.name,
      file,
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve({
            title: file.name,
            url: `${blobUri}/${container}/${result.name}`
          });
        }
      }
    );
  });
};

window.uploadFile = uploadFile;
