
import { Subject } from 'rxjs';
import { ConfigsForAssign, GetSuitesTreeResponse, IReportClient, Outcome, SearchTestCaseItem, SuiteTestCaseItem, SuitesTreeItem, WiState } from '../api/reports/swagger';
import { List } from 'linqts';
import { environment } from 'src/environments/environment';
import { EventEmitter, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';

export class ViewModel
{
    api: IReportClient;
    Refresh(response: GetSuitesTreeResponse) {
        //todo
    }
    
    framework: string;
    fileName: string;
    constructor(init?: Partial<ViewModel>) {
        Object.assign(this, init);
    }  
    rootNs: NameSpaceVm;
    rootTreeItem: TreeItemVm;

    seleniumConnectionString: number;

    _selectedTreeItem: NameSpaceVm;
    get selectedTreeItem(): NameSpaceVm
    {
        return this._selectedTreeItem;
    }
    set selectedTreeItem(value: NameSpaceVm)
    {
        if(this._selectedTreeItem != value)
            this._selectedTreeItem = value;
    }
}
 

export class TreeItemVm
{
    name: string;
    expanded: boolean = false;
    object: any; 
    parent: TreeItemVm;
    children: TreeItemVm[] = [];
}

export class NameSpaceVm  
{
    name: string;
    isDirectory: string;
    comment: string;
    parent: NameSpaceVm;
    children: NameSpaceVm[] = []; 
    controls: ControlVm[] = [];
    constructor(init?: Partial<NameSpaceVm>) 
    {
        Object.assign(this, init);
    }
} 


export class ControlVm  
{ 
    name: string;
    role: string;
    comment: string;
    namespace: NameSpaceVm;
    isMultple: boolean;
    baseClass: string;
    parent: ControlVm;
    children: ControlVm[] = []; 
    searchProps: SearchProperty[] = []; 
    constructor(init?: Partial<ControlVm>) 
    {
        Object.assign(this, init);
    }
} 


export class SearchProperty
{ 
    name: string;
    value: string;
    constructor(init?: Partial<ControlVm>) 
    {
        Object.assign(this, init);
    }
} 
