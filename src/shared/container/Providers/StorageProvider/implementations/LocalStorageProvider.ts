import fs from 'fs'
import path from 'path'
import {IStorageProvider} from '../IStorageProvider'
import upload from '../../../../../config/upload'

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    try{
      await fs.promises.rename(
        path.resolve(upload.tmpFolder, file),
        path.resolve(`${upload.tmpFolder}/${folder}`, file)
        )
      return file
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  async delete(file: string, folder: string): Promise<void>{
    const filename = path.resolve(`${upload.tmpFolder}/${folder}`, file)

    try {
      await fs.promises.stat(filename)
    } catch (err) {
      return
    }

    await fs.promises.unlink(filename)
  }
}
