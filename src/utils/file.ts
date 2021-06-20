import fs from 'fs';

export const deleteFile = async(filename: string) => {
  try {
    // verificar se o arquivo existe
    await fs.promises.stat(filename)
  } catch {
    // se nao existir sai da funcao
    return;
  }

  await fs.promises.unlink(filename)
}
