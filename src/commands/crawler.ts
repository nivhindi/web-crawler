import * as commander from 'commander'
import axios, { AxiosError } from 'axios';

export interface Options extends commander.Command {
    url?: string
    depth?: number
  }
  
  export async function crawler (url?: string, depth?: number): Promise<string> {
    let message = `url is :${url}, depth is: ${depth}`
    return message;
  }

function fetchPage(url: string): Promise<string | undefined> {
  const HTMLData = axios
    .get(url)
    .then(res => res.data)
    .catch((error: AxiosError) => {
      console.error(`There was an error with ${error.config.url}.`);
      console.error(error.toJSON());
    });

  return HTMLData;
}