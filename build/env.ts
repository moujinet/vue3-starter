// 读取所有环境变量并写入 `process.env`
export function wrapperEnv(envConf: Record<string, any>): IViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName
      = realName === 'true' ? true : realName === 'false' ? false : realName

    const numberNames: string[] = [
      'VITE_SERVER_PORT',
    ]
    if (numberNames.includes(envName))
      realName = Number(realName)

    if (envName === 'VITE_SERVER_PROXY') {
      try {
        realName = JSON.parse(realName)
      }
      catch (error) {
        console.error(error)
      }
    }

    ret[envName] = realName
    process.env[envName] = realName
  }

  return ret
}
