import * as commander from 'commander'
import axios, { AxiosError } from 'axios';
import { JSDOM } from 'jsdom';

export interface Options extends commander.Command {
    url?: string
    depth?: number
  }
  
  export async function crawler (url?: string, depth?: number): Promise<string> {
    // let message = `url is :${url}, depth is: ${depth}`
    // return message;
    const fetchedFromWeb = fetchFromWeb(url, depth);
    return "";
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
  

async function fetchFromWeb(url?: string, depth?: number) {
    // Get the HTMLData from fetching
    return fetchPage(url ?? '').then(res => {
        const dom = new JSDOM(res); 
        return extractData(dom.window.document, url);
    });
  }

// Pass the scraped Document from news.ycombinator.com to this
// function to extract data about front page links.
function extractData(document: Document, url?: string, depth?: number) {
    // const urls: HTMLLinkElement[] = Array.from(document.links);
    const images: HTMLImageElement[] = Array.from(
        document.images
    );
    return images.map(image => {
        console.log('image: ' + image.src)
      return {
        imageUrl: image.src,
        sourceUrl: url,
        depth: depth
      };
    });
  }


  /*
  
class Stack<T> implements IStack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | undefined {
      return this.storage.pop();
    }
  
    peek(): T | undefined {
      return this.storage[this.size() - 1];
    }
  
    size(): number {
      return this.storage.length;
    }
  }*/