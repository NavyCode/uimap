import { UrlSegment } from "@angular/router";


export class UrlParser
{
    constructor(url: UrlSegment[])
    {
        this.url = url;
    }
    url: UrlSegment[];
    GetSeleniumConnectionString(): number{
        return +this.url[1]
    }
}
 

