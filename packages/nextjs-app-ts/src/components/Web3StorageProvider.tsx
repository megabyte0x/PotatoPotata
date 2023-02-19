import { CIDString, Filelike, Web3Storage } from 'web3.storage';
import { getFilesFromPath } from 'web3.storage';
import { File } from 'web3.storage';

import { WEB3_STORAGE_API_KEY } from '~~/constants';

function getAccessToken(): string {
  return WEB3_STORAGE_API_KEY;
}

function Web3StorageProvider(): Web3Storage {
  return new Web3Storage({ token: getAccessToken() });
}

async function getFiles(path: string): Promise<Filelike[]> {
  const files = await getFilesFromPath(path);
  console.log(`read ${files.length} file(s) from ${path}`);
  return files;
}

async function storeFiles(): Promise<CIDString> {
  const obj = { hello: 'world' };
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [new File(['contents-of-file-1'], 'plain-utf8.txt'), new File([buffer], 'hello.json')];
  const client = Web3StorageProvider();
  const cid = await client.put(files);
  console.log('stored files with cid:', cid);
  return cid;
}

module.exports = { Web3StorageProvider, getFiles, storeFiles };
