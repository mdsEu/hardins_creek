export function getPortNumber(defaultPort = 3000) : number {
  const port : number = parseInt(process.env.PORT as string);

  if (port) {
    return port;
  }

  return defaultPort;
}

export function isEnvironment(env: string): boolean {
  return process.env.NODE_ENV === env;
}
