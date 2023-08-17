﻿
export interface IReportClient {

    plans_GetPlans(projectId: number): Promise<GetPlansResponse>;

    plans_AddPlan(projectId: number, request: AddOrUpdatePlanRequest): Promise<number>;

    plans_UpdatePlan(projectId: number, planId: number, request: AddOrUpdatePlanRequest): Promise<FileResponse | null>;

    plans_DeletePlan(projectId: number, planId: number): Promise<FileResponse | null>;

    plans_DublicatePlan(projectId: number, planId: number): Promise<number>;

    plans_GetPlanInfo(projectId: number, planId: number): Promise<TestPlanItem>;

    projects_GetProjects(): Promise<GetProjectsResponse>;

    projects_AddProject(request: AddOrUpdateProjectRequest): Promise<number>;

    projects_GetProjectInfo(projectId: number): Promise<ProjectItem>;

    projects_UpdateProject(projectId: number, request: AddOrUpdateProjectRequest): Promise<FileResponse | null>;

    projects_DeleteProject(projectId: number): Promise<FileResponse | null>;

    testSuites_MoveSuite(projectId: number, id: number | undefined, moveSuiteRequest: MoveSuiteRequest): Promise<FileResponse | null>;

    projectUsers_DeleteUser(projectId: number, id: number): Promise<FileResponse | null>;

    projectUsers_GetUsers(projectId: number): Promise<GetUsersResponse>;

    projectUsers_AddVirtualUser(projectId: number, request: AddOrUpdateVirtualUserRequest): Promise<number>;

    projectUsers_UpdateVirtualUser(projectId: number, userId: number, request: AddOrUpdateVirtualUserRequest): Promise<FileResponse | null>;

    projectUsers_AddExistUser(projectId: number, request: AddOrUpdateExistUserRequest): Promise<number | null>;

    projectUsers_UpdateExistUser(projectId: number, userId: number, request: AddOrUpdateExistUserRequest): Promise<FileResponse | null>;

    testCases_GetTestCase(projectId: number, testId: number): Promise<GetTestCaseResponse>;

    testCases_UpdateTest(projectId: number, testId: number, request: AddOrUpdateTestCaseRequest): Promise<FileResponse | null>;

    testCases_DeleteTest(projectId: number, testId: number): Promise<FileResponse | null>;

    testCases_SearchTestCases(projectId: number, text: string | null | undefined): Promise<SearchTestCaseItem[]>;

    testCases_AddTest(projectId: number, request: AddOrUpdateTestCaseRequest): Promise<number>;

    users_Login(login: string | null | undefined, pass: string | null | undefined): Promise<string>;

    users_UserInfo(): Promise<LoggedUserInfo>;

    users_UpdateCurrentUser(request: RegisterOrUpdateUserRequest): Promise<FileResponse | null>;

    users_RegisterUser(request: RegisterOrUpdateUserRequest): Promise<number>;

    files_Upload(projectId: number, file: FileParameter | null | undefined, tags: string | null | undefined): Promise<number>;

    files_Download(projectId: number, id: number): Promise<FileResponse | null>;

    plan_GetSuitesTree(projectId: number, planId: number): Promise<GetSuitesTreeResponse>;

    testConfigs_GetConfigs(projectId: number): Promise<GetConfigsResponse>;

    testConfigs_AddConfig(projectId: number, request: AddOrUpdateConfigsRequest): Promise<number>;

    testConfigs_GetConfigsVars(projectId: number): Promise<GetConfigsVarsResponse>;

    testConfigs_AddConfigVariable(projectId: number, request: AddOrUpdateConfigVarRequest): Promise<number>;

    testConfigs_UpdateConfig(projectId: number, configId: number, request: AddOrUpdateConfigsRequest): Promise<FileResponse | null>;

    testConfigs_DeleteConfig(projectId: number, configId: number): Promise<FileResponse | null>;

    testConfigs_UpdateConfigVariable(projectId: number, id: number, request: AddOrUpdateConfigVarRequest): Promise<FileResponse | null>;

    testConfigs_DeleteConfigVariable(projectId: number, id: number): Promise<FileResponse | null>;

    testPoints_GetSuiteTestPoints(projectId: number, suiteId: number, withCildrenSuites: boolean | undefined, planId: string): Promise<GetSuiteTestPointsResponse>;

    testPoints_SetTester(projectId: number, request: SetTesterRequest, planId: string): Promise<FileResponse | null>;

    testPoints_GetUserListForAssign(projectId: number): Promise<UserIdentity[]>;

    testPoints_SetOutcome(projectId: number, request: SetOutcomeRequest, planId: string, suiteId: string): Promise<FileResponse | null>;

    testPoints_SetComment(projectId: number, request: SetDescriptionRequest, planId: string, suiteId: string): Promise<FileResponse | null>;

    testRuns_Add(projectId: number, request: AddRunRequest): Promise<number>;

    testRuns_AddResult(projectId: number, runId: number, request: TestResultRequest): Promise<number>;

    testRuns_GetResults(projectId: number, runId: number): Promise<TestRunPoint[]>;

    testRuns_AddFiles(projectId: number, resultId: number, ids: number[], runId: string): Promise<FileResponse | null>;

    testSuite_GetSuiteTestCases(projectId: number, suiteId: number, withCildren: boolean | undefined, planId: string): Promise<GetSuiteTestCasesResponse>;

    testSuite_AddTestCaseSuite(projectId: number, suiteId: number, request: AddTestCaseToSuiteRequest, planId: string): Promise<FileResponse | null>;

    testSuite_DeleteTestCaseFromSuite(projectId: number, request: DeleteTestCaseFromSuiteRequest, planId: string, suiteId: string): Promise<FileResponse | null>;

    testSuite_GetSuiteConfigs(projectId: number, suiteId: number, planId: string): Promise<number[]>;

    testSuite_SetSuiteConfig(projectId: number, suiteId: number, request: SetTestSuiteConfigRequest, planId: string): Promise<FileResponse | null>;

    testSuite_ReorderTestCasess(projectId: number, request: ReorderTestCasesRequest, planId: string, suiteId: string): Promise<FileResponse | null>;

    testSuite_SetTestCaseConfig(projectId: number, request: SetTestCaseConfigRequest, planId: string, suiteId: string): Promise<FileResponse | null>;

    testSuite_GetConfigsForAssign(projectId: number): Promise<GetConfigsForAssignResponse>;

    testSuites_GetChildrenSuites(projectId: number, suiteId: number, planId: string): Promise<GetSuitesTreeResponse>;

    testSuites_AddSuite(projectId: number, planId: number, request: AddOrUpdateSuiteRequest): Promise<number>;

    testSuites_UpdateSuite(projectId: number, suiteId: number, request: AddOrUpdateSuiteRequest, planId: string): Promise<FileResponse | null>;

    testSuites_DeleteSuite(projectId: number, suiteId: number, planId: string): Promise<FileResponse | null>;
}

export class ReportClient implements IReportClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://127.0.0.1:5000";
    }

    plans_GetPlans(projectId: number): Promise<GetPlansResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/plans";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlans_GetPlans(_response);
        });
    }

    protected processPlans_GetPlans(response: Response): Promise<GetPlansResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetPlansResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetPlansResponse>(null as any);
    }

    plans_AddPlan(projectId: number, request: AddOrUpdatePlanRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/plans";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlans_AddPlan(_response);
        });
    }

    protected processPlans_AddPlan(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    plans_UpdatePlan(projectId: number, planId: number, request: AddOrUpdatePlanRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/plans/{planId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlans_UpdatePlan(_response);
        });
    }

    protected processPlans_UpdatePlan(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    plans_DeletePlan(projectId: number, planId: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/plans/{planId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlans_DeletePlan(_response);
        });
    }

    protected processPlans_DeletePlan(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    plans_DublicatePlan(projectId: number, planId: number): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/plans/{planId}/dublicate";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlans_DublicatePlan(_response);
        });
    }

    protected processPlans_DublicatePlan(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    plans_GetPlanInfo(projectId: number, planId: number): Promise<TestPlanItem> {
        let url_ = this.baseUrl + "/projects/{projectId}/plan/{planId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlans_GetPlanInfo(_response);
        });
    }

    protected processPlans_GetPlanInfo(response: Response): Promise<TestPlanItem> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = TestPlanItem.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<TestPlanItem>(null as any);
    }

    projects_GetProjects(): Promise<GetProjectsResponse> {
        let url_ = this.baseUrl + "/projects";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjects_GetProjects(_response);
        });
    }

    protected processProjects_GetProjects(response: Response): Promise<GetProjectsResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetProjectsResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetProjectsResponse>(null as any);
    }

    projects_AddProject(request: AddOrUpdateProjectRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjects_AddProject(_response);
        });
    }

    protected processProjects_AddProject(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    projects_GetProjectInfo(projectId: number): Promise<ProjectItem> {
        let url_ = this.baseUrl + "/project/{projectId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjects_GetProjectInfo(_response);
        });
    }

    protected processProjects_GetProjectInfo(response: Response): Promise<ProjectItem> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = ProjectItem.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ProjectItem>(null as any);
    }

    projects_UpdateProject(projectId: number, request: AddOrUpdateProjectRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/project/{projectId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjects_UpdateProject(_response);
        });
    }

    protected processProjects_UpdateProject(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    projects_DeleteProject(projectId: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjects_DeleteProject(_response);
        });
    }

    protected processProjects_DeleteProject(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuites_MoveSuite(projectId: number, id: number | undefined, moveSuiteRequest: MoveSuiteRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}?";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(moveSuiteRequest);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuites_MoveSuite(_response);
        });
    }

    protected processTestSuites_MoveSuite(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    projectUsers_DeleteUser(projectId: number, id: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/users/{id}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjectUsers_DeleteUser(_response);
        });
    }

    protected processProjectUsers_DeleteUser(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    projectUsers_GetUsers(projectId: number): Promise<GetUsersResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/users";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjectUsers_GetUsers(_response);
        });
    }

    protected processProjectUsers_GetUsers(response: Response): Promise<GetUsersResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetUsersResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetUsersResponse>(null as any);
    }

    projectUsers_AddVirtualUser(projectId: number, request: AddOrUpdateVirtualUserRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/users";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjectUsers_AddVirtualUser(_response);
        });
    }

    protected processProjectUsers_AddVirtualUser(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    projectUsers_UpdateVirtualUser(projectId: number, userId: number, request: AddOrUpdateVirtualUserRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/users/{userId}/info";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjectUsers_UpdateVirtualUser(_response);
        });
    }

    protected processProjectUsers_UpdateVirtualUser(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    projectUsers_AddExistUser(projectId: number, request: AddOrUpdateExistUserRequest): Promise<number | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/users/exist";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjectUsers_AddExistUser(_response);
        });
    }

    protected processProjectUsers_AddExistUser(response: Response): Promise<number | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number | null>(null as any);
    }

    projectUsers_UpdateExistUser(projectId: number, userId: number, request: AddOrUpdateExistUserRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/users/exist/{userId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processProjectUsers_UpdateExistUser(_response);
        });
    }

    protected processProjectUsers_UpdateExistUser(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testCases_GetTestCase(projectId: number, testId: number): Promise<GetTestCaseResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/tests/{testId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (testId === undefined || testId === null)
            throw new Error("The parameter 'testId' must be defined.");
        url_ = url_.replace("{testId}", encodeURIComponent("" + testId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestCases_GetTestCase(_response);
        });
    }

    protected processTestCases_GetTestCase(response: Response): Promise<GetTestCaseResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetTestCaseResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetTestCaseResponse>(null as any);
    }

    testCases_UpdateTest(projectId: number, testId: number, request: AddOrUpdateTestCaseRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/tests/{testId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (testId === undefined || testId === null)
            throw new Error("The parameter 'testId' must be defined.");
        url_ = url_.replace("{testId}", encodeURIComponent("" + testId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestCases_UpdateTest(_response);
        });
    }

    protected processTestCases_UpdateTest(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testCases_DeleteTest(projectId: number, testId: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/tests/{testId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (testId === undefined || testId === null)
            throw new Error("The parameter 'testId' must be defined.");
        url_ = url_.replace("{testId}", encodeURIComponent("" + testId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestCases_DeleteTest(_response);
        });
    }

    protected processTestCases_DeleteTest(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testCases_SearchTestCases(projectId: number, text: string | null | undefined): Promise<SearchTestCaseItem[]> {
        let url_ = this.baseUrl + "/projects/{projectId}/tests/search?";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (text !== undefined && text !== null)
            url_ += "text=" + encodeURIComponent("" + text) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestCases_SearchTestCases(_response);
        });
    }

    protected processTestCases_SearchTestCases(response: Response): Promise<SearchTestCaseItem[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(SearchTestCaseItem.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<SearchTestCaseItem[]>(null as any);
    }

    testCases_AddTest(projectId: number, request: AddOrUpdateTestCaseRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/tests";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestCases_AddTest(_response);
        });
    }

    protected processTestCases_AddTest(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    users_Login(login: string | null | undefined, pass: string | null | undefined): Promise<string> {
        let url_ = this.baseUrl + "/users/login?";
        if (login !== undefined && login !== null)
            url_ += "login=" + encodeURIComponent("" + login) + "&";
        if (pass !== undefined && pass !== null)
            url_ += "pass=" + encodeURIComponent("" + pass) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUsers_Login(_response);
        });
    }

    protected processUsers_Login(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    users_UserInfo(): Promise<LoggedUserInfo> {
        let url_ = this.baseUrl + "/users/current/info";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUsers_UserInfo(_response);
        });
    }

    protected processUsers_UserInfo(response: Response): Promise<LoggedUserInfo> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = LoggedUserInfo.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<LoggedUserInfo>(null as any);
    }

    users_UpdateCurrentUser(request: RegisterOrUpdateUserRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/users/current/info";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUsers_UpdateCurrentUser(_response);
        });
    }

    protected processUsers_UpdateCurrentUser(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    users_RegisterUser(request: RegisterOrUpdateUserRequest): Promise<number> {
        let url_ = this.baseUrl + "/users";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUsers_RegisterUser(_response);
        });
    }

    protected processUsers_RegisterUser(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    files_Upload(projectId: number, file: FileParameter | null | undefined, tags: string | null | undefined): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/files?";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (tags !== undefined && tags !== null)
            url_ += "tags=" + encodeURIComponent("" + tags) + "&";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (file !== null && file !== undefined)
            content_.append("file", file.data, file.fileName ? file.fileName : "file");

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_Upload(_response);
        });
    }

    protected processFiles_Upload(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    files_Download(projectId: number, id: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/files/{id}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processFiles_Download(_response);
        });
    }

    protected processFiles_Download(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    plan_GetSuitesTree(projectId: number, planId: number): Promise<GetSuitesTreeResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/tree";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPlan_GetSuitesTree(_response);
        });
    }

    protected processPlan_GetSuitesTree(response: Response): Promise<GetSuitesTreeResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetSuitesTreeResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetSuitesTreeResponse>(null as any);
    }

    testConfigs_GetConfigs(projectId: number): Promise<GetConfigsResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_GetConfigs(_response);
        });
    }

    protected processTestConfigs_GetConfigs(response: Response): Promise<GetConfigsResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetConfigsResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetConfigsResponse>(null as any);
    }

    testConfigs_AddConfig(projectId: number, request: AddOrUpdateConfigsRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_AddConfig(_response);
        });
    }

    protected processTestConfigs_AddConfig(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    testConfigs_GetConfigsVars(projectId: number): Promise<GetConfigsVarsResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configvars";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_GetConfigsVars(_response);
        });
    }

    protected processTestConfigs_GetConfigsVars(response: Response): Promise<GetConfigsVarsResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetConfigsVarsResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetConfigsVarsResponse>(null as any);
    }

    testConfigs_AddConfigVariable(projectId: number, request: AddOrUpdateConfigVarRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configvars";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_AddConfigVariable(_response);
        });
    }

    protected processTestConfigs_AddConfigVariable(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    testConfigs_UpdateConfig(projectId: number, configId: number, request: AddOrUpdateConfigsRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configs/{configId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (configId === undefined || configId === null)
            throw new Error("The parameter 'configId' must be defined.");
        url_ = url_.replace("{configId}", encodeURIComponent("" + configId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_UpdateConfig(_response);
        });
    }

    protected processTestConfigs_UpdateConfig(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testConfigs_DeleteConfig(projectId: number, configId: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configs/{configId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (configId === undefined || configId === null)
            throw new Error("The parameter 'configId' must be defined.");
        url_ = url_.replace("{configId}", encodeURIComponent("" + configId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_DeleteConfig(_response);
        });
    }

    protected processTestConfigs_DeleteConfig(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testConfigs_UpdateConfigVariable(projectId: number, id: number, request: AddOrUpdateConfigVarRequest): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configvars/{id}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_UpdateConfigVariable(_response);
        });
    }

    protected processTestConfigs_UpdateConfigVariable(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testConfigs_DeleteConfigVariable(projectId: number, id: number): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/configvars/{id}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestConfigs_DeleteConfigVariable(_response);
        });
    }

    protected processTestConfigs_DeleteConfigVariable(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testPoints_GetSuiteTestPoints(projectId: number, suiteId: number, withCildrenSuites: boolean | undefined, planId: string): Promise<GetSuiteTestPointsResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/points?";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (withCildrenSuites === null)
            throw new Error("The parameter 'withCildrenSuites' cannot be null.");
        else if (withCildrenSuites !== undefined)
            url_ += "withCildrenSuites=" + encodeURIComponent("" + withCildrenSuites) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestPoints_GetSuiteTestPoints(_response);
        });
    }

    protected processTestPoints_GetSuiteTestPoints(response: Response): Promise<GetSuiteTestPointsResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetSuiteTestPointsResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetSuiteTestPointsResponse>(null as any);
    }

    testPoints_SetTester(projectId: number, request: SetTesterRequest, planId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/testers";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestPoints_SetTester(_response);
        });
    }

    protected processTestPoints_SetTester(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testPoints_GetUserListForAssign(projectId: number): Promise<UserIdentity[]> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/list/assignusers";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestPoints_GetUserListForAssign(_response);
        });
    }

    protected processTestPoints_GetUserListForAssign(response: Response): Promise<UserIdentity[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(UserIdentity.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserIdentity[]>(null as any);
    }

    testPoints_SetOutcome(projectId: number, request: SetOutcomeRequest, planId: string, suiteId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/tests/result";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestPoints_SetOutcome(_response);
        });
    }

    protected processTestPoints_SetOutcome(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testPoints_SetComment(projectId: number, request: SetDescriptionRequest, planId: string, suiteId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/tests/comment";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestPoints_SetComment(_response);
        });
    }

    protected processTestPoints_SetComment(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testRuns_Add(projectId: number, request: AddRunRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/runs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestRuns_Add(_response);
        });
    }

    protected processTestRuns_Add(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    testRuns_AddResult(projectId: number, runId: number, request: TestResultRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/runs/{runId}/results";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (runId === undefined || runId === null)
            throw new Error("The parameter 'runId' must be defined.");
        url_ = url_.replace("{runId}", encodeURIComponent("" + runId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestRuns_AddResult(_response);
        });
    }

    protected processTestRuns_AddResult(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    testRuns_GetResults(projectId: number, runId: number): Promise<TestRunPoint[]> {
        let url_ = this.baseUrl + "/projects/{projectId}/runs/{runId}/results";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (runId === undefined || runId === null)
            throw new Error("The parameter 'runId' must be defined.");
        url_ = url_.replace("{runId}", encodeURIComponent("" + runId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestRuns_GetResults(_response);
        });
    }

    protected processTestRuns_GetResults(response: Response): Promise<TestRunPoint[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(TestRunPoint.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<TestRunPoint[]>(null as any);
    }

    testRuns_AddFiles(projectId: number, resultId: number, ids: number[], runId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/runs/{runId}/results/{resultId}/files";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (resultId === undefined || resultId === null)
            throw new Error("The parameter 'resultId' must be defined.");
        url_ = url_.replace("{resultId}", encodeURIComponent("" + resultId));
        if (runId === undefined || runId === null)
            throw new Error("The parameter 'runId' must be defined.");
        url_ = url_.replace("{runId}", encodeURIComponent("" + runId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(ids);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestRuns_AddFiles(_response);
        });
    }

    protected processTestRuns_AddFiles(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuite_GetSuiteTestCases(projectId: number, suiteId: number, withCildren: boolean | undefined, planId: string): Promise<GetSuiteTestCasesResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/tests?";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (withCildren === null)
            throw new Error("The parameter 'withCildren' cannot be null.");
        else if (withCildren !== undefined)
            url_ += "withCildren=" + encodeURIComponent("" + withCildren) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_GetSuiteTestCases(_response);
        });
    }

    protected processTestSuite_GetSuiteTestCases(response: Response): Promise<GetSuiteTestCasesResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetSuiteTestCasesResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetSuiteTestCasesResponse>(null as any);
    }

    testSuite_AddTestCaseSuite(projectId: number, suiteId: number, request: AddTestCaseToSuiteRequest, planId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/tests";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_AddTestCaseSuite(_response);
        });
    }

    protected processTestSuite_AddTestCaseSuite(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuite_DeleteTestCaseFromSuite(projectId: number, request: DeleteTestCaseFromSuiteRequest, planId: string, suiteId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/tests";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_DeleteTestCaseFromSuite(_response);
        });
    }

    protected processTestSuite_DeleteTestCaseFromSuite(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuite_GetSuiteConfigs(projectId: number, suiteId: number, planId: string): Promise<number[]> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/configs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_GetSuiteConfigs(_response);
        });
    }

    protected processTestSuite_GetSuiteConfigs(response: Response): Promise<number[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(item);
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number[]>(null as any);
    }

    testSuite_SetSuiteConfig(projectId: number, suiteId: number, request: SetTestSuiteConfigRequest, planId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/configs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_SetSuiteConfig(_response);
        });
    }

    protected processTestSuite_SetSuiteConfig(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuite_ReorderTestCasess(projectId: number, request: ReorderTestCasesRequest, planId: string, suiteId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/tests/reorder";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_ReorderTestCasess(_response);
        });
    }

    protected processTestSuite_ReorderTestCasess(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuite_SetTestCaseConfig(projectId: number, request: SetTestCaseConfigRequest, planId: string, suiteId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/testconfigs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_SetTestCaseConfig(_response);
        });
    }

    protected processTestSuite_SetTestCaseConfig(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuite_GetConfigsForAssign(projectId: number): Promise<GetConfigsForAssignResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/list/configs";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuite_GetConfigsForAssign(_response);
        });
    }

    protected processTestSuite_GetConfigsForAssign(response: Response): Promise<GetConfigsForAssignResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetConfigsForAssignResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetConfigsForAssignResponse>(null as any);
    }

    testSuites_GetChildrenSuites(projectId: number, suiteId: number, planId: string): Promise<GetSuitesTreeResponse> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}/children";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuites_GetChildrenSuites(_response);
        });
    }

    protected processTestSuites_GetChildrenSuites(response: Response): Promise<GetSuitesTreeResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetSuitesTreeResponse.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetSuitesTreeResponse>(null as any);
    }

    testSuites_AddSuite(projectId: number, planId: number, request: AddOrUpdateSuiteRequest): Promise<number> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuites_AddSuite(_response);
        });
    }

    protected processTestSuites_AddSuite(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    testSuites_UpdateSuite(projectId: number, suiteId: number, request: AddOrUpdateSuiteRequest, planId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuites_UpdateSuite(_response);
        });
    }

    protected processTestSuites_UpdateSuite(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }

    testSuites_DeleteSuite(projectId: number, suiteId: number, planId: string): Promise<FileResponse | null> {
        let url_ = this.baseUrl + "/projects/{projectId}/test/plans/{planId}/suites/{suiteId}";
        if (projectId === undefined || projectId === null)
            throw new Error("The parameter 'projectId' must be defined.");
        url_ = url_.replace("{projectId}", encodeURIComponent("" + projectId));
        if (suiteId === undefined || suiteId === null)
            throw new Error("The parameter 'suiteId' must be defined.");
        url_ = url_.replace("{suiteId}", encodeURIComponent("" + suiteId));
        if (planId === undefined || planId === null)
            throw new Error("The parameter 'planId' must be defined.");
        url_ = url_.replace("{planId}", encodeURIComponent("" + planId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processTestSuites_DeleteSuite(_response);
        });
    }

    protected processTestSuites_DeleteSuite(response: Response): Promise<FileResponse | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse | null>(null as any);
    }
}

export class GetPlansResponse implements IGetPlansResponse {
    plans?: TestPlanItem[] | undefined;

    constructor(data?: IGetPlansResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["plans"])) {
                this.plans = [] as any;
                for (let item of _data["plans"])
                    this.plans!.push(TestPlanItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetPlansResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetPlansResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.plans)) {
            data["plans"] = [];
            for (let item of this.plans)
                data["plans"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetPlansResponse {
    plans?: TestPlanItem[] | undefined;
}

export class TestPlanItem implements ITestPlanItem {
    id!: number;
    name?: string | undefined;
    comment?: string | undefined;
    state!: PlanState;
    assignedTo?: UserIdentity | undefined;

    constructor(data?: ITestPlanItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.comment = _data["comment"];
            this.state = _data["state"];
            this.assignedTo = _data["assignedTo"] ? UserIdentity.fromJS(_data["assignedTo"]) : <any>undefined;
        }
    }

    static fromJS(data: any): TestPlanItem {
        data = typeof data === 'object' ? data : {};
        let result = new TestPlanItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["comment"] = this.comment;
        data["state"] = this.state;
        data["assignedTo"] = this.assignedTo ? this.assignedTo.toJSON() : <any>undefined;
        return data;
    }
}

export interface ITestPlanItem {
    id: number;
    name?: string | undefined;
    comment?: string | undefined;
    state: PlanState;
    assignedTo?: UserIdentity | undefined;
}

export enum PlanState {
    Planed = 0,
    Active = 1,
    Closed = 2,
}

export class UserIdentity implements IUserIdentity {
    id!: number;
    name?: string | undefined;

    constructor(data?: IUserIdentity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): UserIdentity {
        data = typeof data === 'object' ? data : {};
        let result = new UserIdentity();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data;
    }
}

export interface IUserIdentity {
    id: number;
    name?: string | undefined;
}

export class AddOrUpdatePlanRequest implements IAddOrUpdatePlanRequest {
    name?: string | undefined;
    description?: string | undefined;
    state!: PlanState;
    assignedTo!: number;

    constructor(data?: IAddOrUpdatePlanRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.state = _data["state"];
            this.assignedTo = _data["assignedTo"];
        }
    }

    static fromJS(data: any): AddOrUpdatePlanRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdatePlanRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["state"] = this.state;
        data["assignedTo"] = this.assignedTo;
        return data;
    }
}

export interface IAddOrUpdatePlanRequest {
    name?: string | undefined;
    description?: string | undefined;
    state: PlanState;
    assignedTo: number;
}

export class GetProjectsResponse implements IGetProjectsResponse {
    projects?: ProjectItem[] | undefined;

    constructor(data?: IGetProjectsResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["projects"])) {
                this.projects = [] as any;
                for (let item of _data["projects"])
                    this.projects!.push(ProjectItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetProjectsResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetProjectsResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.projects)) {
            data["projects"] = [];
            for (let item of this.projects)
                data["projects"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetProjectsResponse {
    projects?: ProjectItem[] | undefined;
}

export class ProjectItem implements IProjectItem {
    id!: number;
    name?: string | undefined;
    comment?: string | undefined;

    constructor(data?: IProjectItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.comment = _data["comment"];
        }
    }

    static fromJS(data: any): ProjectItem {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["comment"] = this.comment;
        return data;
    }
}

export interface IProjectItem {
    id: number;
    name?: string | undefined;
    comment?: string | undefined;
}

export class AddOrUpdateProjectRequest implements IAddOrUpdateProjectRequest {
    name?: string | undefined;
    description?: string | undefined;

    constructor(data?: IAddOrUpdateProjectRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): AddOrUpdateProjectRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateProjectRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        return data;
    }
}

export interface IAddOrUpdateProjectRequest {
    name?: string | undefined;
    description?: string | undefined;
}

export class GetUsersResponse implements IGetUsersResponse {
    users?: UserItem[] | undefined;

    constructor(data?: IGetUsersResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["users"])) {
                this.users = [] as any;
                for (let item of _data["users"])
                    this.users!.push(UserItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetUsersResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetUsersResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.users)) {
            data["users"] = [];
            for (let item of this.users)
                data["users"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetUsersResponse {
    users?: UserItem[] | undefined;
}

export class UserItem implements IUserItem {
    id!: number;
    name?: string | undefined;
    login?: string | undefined;
    mail?: string | undefined;
    role!: UserRole;
    isVirtual!: boolean;
    identity?: UserIdentity | undefined;

    constructor(data?: IUserItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.login = _data["login"];
            this.mail = _data["mail"];
            this.role = _data["role"];
            this.isVirtual = _data["isVirtual"];
            this.identity = _data["identity"] ? UserIdentity.fromJS(_data["identity"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UserItem {
        data = typeof data === 'object' ? data : {};
        let result = new UserItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["login"] = this.login;
        data["mail"] = this.mail;
        data["role"] = this.role;
        data["isVirtual"] = this.isVirtual;
        data["identity"] = this.identity ? this.identity.toJSON() : <any>undefined;
        return data;
    }
}

export interface IUserItem {
    id: number;
    name?: string | undefined;
    login?: string | undefined;
    mail?: string | undefined;
    role: UserRole;
    isVirtual: boolean;
    identity?: UserIdentity | undefined;
}

export enum UserRole {
    Guest = 0,
    Tester = 1,
    TestManager = 2,
    Owner = 3,
    Assessor = 4,
}

export class AddOrUpdateVirtualUserRequest implements IAddOrUpdateVirtualUserRequest {
    name?: string | undefined;
    login?: string | undefined;
    pass?: string | undefined;
    phone?: string | undefined;
    mail?: string | undefined;
    role!: UserRole;

    constructor(data?: IAddOrUpdateVirtualUserRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.login = _data["login"];
            this.pass = _data["pass"];
            this.phone = _data["phone"];
            this.mail = _data["mail"];
            this.role = _data["role"];
        }
    }

    static fromJS(data: any): AddOrUpdateVirtualUserRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateVirtualUserRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["login"] = this.login;
        data["pass"] = this.pass;
        data["phone"] = this.phone;
        data["mail"] = this.mail;
        data["role"] = this.role;
        return data;
    }
}

export interface IAddOrUpdateVirtualUserRequest {
    name?: string | undefined;
    login?: string | undefined;
    pass?: string | undefined;
    phone?: string | undefined;
    mail?: string | undefined;
    role: UserRole;
}

export class AddOrUpdateExistUserRequest implements IAddOrUpdateExistUserRequest {
    mail?: string | undefined;
    role!: UserRole;

    constructor(data?: IAddOrUpdateExistUserRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.mail = _data["mail"];
            this.role = _data["role"];
        }
    }

    static fromJS(data: any): AddOrUpdateExistUserRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateExistUserRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["mail"] = this.mail;
        data["role"] = this.role;
        return data;
    }
}

export interface IAddOrUpdateExistUserRequest {
    mail?: string | undefined;
    role: UserRole;
}

export class GetTestCaseResponse implements IGetTestCaseResponse {
    id!: number;
    priority!: number;
    state!: WiState;
    assignedTo?: UserIdentity | undefined;
    title?: string | undefined;
    description?: string | undefined;
    automationStatus!: AutomationStatus;
    automationTestName?: string | undefined;
    automationTestStorage?: string | undefined;
    automationTestType?: string | undefined;
    precondition?: string | undefined;
    postcondition?: string | undefined;
    changeBy?: UserIdentity | undefined;
    steps?: TestStepInfo[] | undefined;

    constructor(data?: IGetTestCaseResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.priority = _data["priority"];
            this.state = _data["state"];
            this.assignedTo = _data["assignedTo"] ? UserIdentity.fromJS(_data["assignedTo"]) : <any>undefined;
            this.title = _data["title"];
            this.description = _data["description"];
            this.automationStatus = _data["automationStatus"];
            this.automationTestName = _data["automationTestName"];
            this.automationTestStorage = _data["automationTestStorage"];
            this.automationTestType = _data["automationTestType"];
            this.precondition = _data["precondition"];
            this.postcondition = _data["postcondition"];
            this.changeBy = _data["changeBy"] ? UserIdentity.fromJS(_data["changeBy"]) : <any>undefined;
            if (Array.isArray(_data["steps"])) {
                this.steps = [] as any;
                for (let item of _data["steps"])
                    this.steps!.push(TestStepInfo.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetTestCaseResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetTestCaseResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["priority"] = this.priority;
        data["state"] = this.state;
        data["assignedTo"] = this.assignedTo ? this.assignedTo.toJSON() : <any>undefined;
        data["title"] = this.title;
        data["description"] = this.description;
        data["automationStatus"] = this.automationStatus;
        data["automationTestName"] = this.automationTestName;
        data["automationTestStorage"] = this.automationTestStorage;
        data["automationTestType"] = this.automationTestType;
        data["precondition"] = this.precondition;
        data["postcondition"] = this.postcondition;
        data["changeBy"] = this.changeBy ? this.changeBy.toJSON() : <any>undefined;
        if (Array.isArray(this.steps)) {
            data["steps"] = [];
            for (let item of this.steps)
                data["steps"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetTestCaseResponse {
    id: number;
    priority: number;
    state: WiState;
    assignedTo?: UserIdentity | undefined;
    title?: string | undefined;
    description?: string | undefined;
    automationStatus: AutomationStatus;
    automationTestName?: string | undefined;
    automationTestStorage?: string | undefined;
    automationTestType?: string | undefined;
    precondition?: string | undefined;
    postcondition?: string | undefined;
    changeBy?: UserIdentity | undefined;
    steps?: TestStepInfo[] | undefined;
}

export enum WiState {
    Design = 0,
    Closed = 1,
    Ready = 2,
}

export enum AutomationStatus {
    Manual = 0,
    Automated = 1,
}

export class TestStepInfo implements ITestStepInfo {
    id!: number;
    order!: number;
    action?: string | undefined;
    result?: string | undefined;

    constructor(data?: ITestStepInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.order = _data["order"];
            this.action = _data["action"];
            this.result = _data["result"];
        }
    }

    static fromJS(data: any): TestStepInfo {
        data = typeof data === 'object' ? data : {};
        let result = new TestStepInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["order"] = this.order;
        data["action"] = this.action;
        data["result"] = this.result;
        return data;
    }
}

export interface ITestStepInfo {
    id: number;
    order: number;
    action?: string | undefined;
    result?: string | undefined;
}

export class SearchTestCaseItem implements ISearchTestCaseItem {
    id!: number;
    name?: string | undefined;
    priority!: number;

    constructor(data?: ISearchTestCaseItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.priority = _data["priority"];
        }
    }

    static fromJS(data: any): SearchTestCaseItem {
        data = typeof data === 'object' ? data : {};
        let result = new SearchTestCaseItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["priority"] = this.priority;
        return data;
    }
}

export interface ISearchTestCaseItem {
    id: number;
    name?: string | undefined;
    priority: number;
}

export class AddOrUpdateTestCaseRequest implements IAddOrUpdateTestCaseRequest {
    priority!: number;
    state!: WiState;
    assignedTo!: number;
    title?: string | undefined;
    description?: string | undefined;
    automationStatus!: AutomationStatus;
    automationTestName?: string | undefined;
    automationTestStorage?: string | undefined;
    automationTestType?: string | undefined;
    precondition?: string | undefined;
    postcondition?: string | undefined;
    steps?: AddOrUpdateTestStep[] | undefined;

    constructor(data?: IAddOrUpdateTestCaseRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.priority = _data["priority"];
            this.state = _data["state"];
            this.assignedTo = _data["assignedTo"];
            this.title = _data["title"];
            this.description = _data["description"];
            this.automationStatus = _data["automationStatus"];
            this.automationTestName = _data["automationTestName"];
            this.automationTestStorage = _data["automationTestStorage"];
            this.automationTestType = _data["automationTestType"];
            this.precondition = _data["precondition"];
            this.postcondition = _data["postcondition"];
            if (Array.isArray(_data["steps"])) {
                this.steps = [] as any;
                for (let item of _data["steps"])
                    this.steps!.push(AddOrUpdateTestStep.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AddOrUpdateTestCaseRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateTestCaseRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["priority"] = this.priority;
        data["state"] = this.state;
        data["assignedTo"] = this.assignedTo;
        data["title"] = this.title;
        data["description"] = this.description;
        data["automationStatus"] = this.automationStatus;
        data["automationTestName"] = this.automationTestName;
        data["automationTestStorage"] = this.automationTestStorage;
        data["automationTestType"] = this.automationTestType;
        data["precondition"] = this.precondition;
        data["postcondition"] = this.postcondition;
        if (Array.isArray(this.steps)) {
            data["steps"] = [];
            for (let item of this.steps)
                data["steps"].push(item.toJSON());
        }
        return data;
    }
}

export interface IAddOrUpdateTestCaseRequest {
    priority: number;
    state: WiState;
    assignedTo: number;
    title?: string | undefined;
    description?: string | undefined;
    automationStatus: AutomationStatus;
    automationTestName?: string | undefined;
    automationTestStorage?: string | undefined;
    automationTestType?: string | undefined;
    precondition?: string | undefined;
    postcondition?: string | undefined;
    steps?: AddOrUpdateTestStep[] | undefined;
}

export class AddOrUpdateTestStep implements IAddOrUpdateTestStep {
    id?: number | undefined;
    order!: number;
    action?: string | undefined;
    result?: string | undefined;

    constructor(data?: IAddOrUpdateTestStep) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.order = _data["order"];
            this.action = _data["action"];
            this.result = _data["result"];
        }
    }

    static fromJS(data: any): AddOrUpdateTestStep {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateTestStep();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["order"] = this.order;
        data["action"] = this.action;
        data["result"] = this.result;
        return data;
    }
}

export interface IAddOrUpdateTestStep {
    id?: number | undefined;
    order: number;
    action?: string | undefined;
    result?: string | undefined;
}

export class LoggedUserInfo implements ILoggedUserInfo {
    id!: number;
    name?: string | undefined;
    isRoot!: boolean;

    constructor(data?: ILoggedUserInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.isRoot = _data["isRoot"];
        }
    }

    static fromJS(data: any): LoggedUserInfo {
        data = typeof data === 'object' ? data : {};
        let result = new LoggedUserInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["isRoot"] = this.isRoot;
        return data;
    }
}

export interface ILoggedUserInfo {
    id: number;
    name?: string | undefined;
    isRoot: boolean;
}

export class RegisterOrUpdateUserRequest implements IRegisterOrUpdateUserRequest {
    name?: string | undefined;
    login?: string | undefined;
    pass?: string | undefined;
    mail?: string | undefined;

    constructor(data?: IRegisterOrUpdateUserRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.login = _data["login"];
            this.pass = _data["pass"];
            this.mail = _data["mail"];
        }
    }

    static fromJS(data: any): RegisterOrUpdateUserRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterOrUpdateUserRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["login"] = this.login;
        data["pass"] = this.pass;
        data["mail"] = this.mail;
        return data;
    }
}

export interface IRegisterOrUpdateUserRequest {
    name?: string | undefined;
    login?: string | undefined;
    pass?: string | undefined;
    mail?: string | undefined;
}

export class GetSuitesTreeResponse implements IGetSuitesTreeResponse {
    suites?: SuitesTreeItem[] | undefined;

    constructor(data?: IGetSuitesTreeResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["suites"])) {
                this.suites = [] as any;
                for (let item of _data["suites"])
                    this.suites!.push(SuitesTreeItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetSuitesTreeResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetSuitesTreeResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.suites)) {
            data["suites"] = [];
            for (let item of this.suites)
                data["suites"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetSuitesTreeResponse {
    suites?: SuitesTreeItem[] | undefined;
}

export class SuitesTreeItem implements ISuitesTreeItem {
    id!: number;
    name?: string | undefined;
    parentId?: number | undefined;

    constructor(data?: ISuitesTreeItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.parentId = _data["parentId"];
        }
    }

    static fromJS(data: any): SuitesTreeItem {
        data = typeof data === 'object' ? data : {};
        let result = new SuitesTreeItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["parentId"] = this.parentId;
        return data;
    }
}

export interface ISuitesTreeItem {
    id: number;
    name?: string | undefined;
    parentId?: number | undefined;
}

export class GetConfigsResponse implements IGetConfigsResponse {
    configs?: ConfigItem[] | undefined;

    constructor(data?: IGetConfigsResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["configs"])) {
                this.configs = [] as any;
                for (let item of _data["configs"])
                    this.configs!.push(ConfigItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetConfigsResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetConfigsResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.configs)) {
            data["configs"] = [];
            for (let item of this.configs)
                data["configs"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetConfigsResponse {
    configs?: ConfigItem[] | undefined;
}

export class ConfigItem implements IConfigItem {
    id!: number;
    name?: string | undefined;
    comment?: string | undefined;
    isDefault!: boolean;
    variables?: ConfigVariableItem[] | undefined;

    constructor(data?: IConfigItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.comment = _data["comment"];
            this.isDefault = _data["isDefault"];
            if (Array.isArray(_data["variables"])) {
                this.variables = [] as any;
                for (let item of _data["variables"])
                    this.variables!.push(ConfigVariableItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConfigItem {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["comment"] = this.comment;
        data["isDefault"] = this.isDefault;
        if (Array.isArray(this.variables)) {
            data["variables"] = [];
            for (let item of this.variables)
                data["variables"].push(item.toJSON());
        }
        return data;
    }
}

export interface IConfigItem {
    id: number;
    name?: string | undefined;
    comment?: string | undefined;
    isDefault: boolean;
    variables?: ConfigVariableItem[] | undefined;
}

export class ConfigVariableItem implements IConfigVariableItem {
    id!: number;
    variableId!: number;
    valueId!: number;

    constructor(data?: IConfigVariableItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.variableId = _data["variableId"];
            this.valueId = _data["valueId"];
        }
    }

    static fromJS(data: any): ConfigVariableItem {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigVariableItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["variableId"] = this.variableId;
        data["valueId"] = this.valueId;
        return data;
    }
}

export interface IConfigVariableItem {
    id: number;
    variableId: number;
    valueId: number;
}

export class GetConfigsVarsResponse implements IGetConfigsVarsResponse {
    vars?: ConfigVarItem[] | undefined;

    constructor(data?: IGetConfigsVarsResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["vars"])) {
                this.vars = [] as any;
                for (let item of _data["vars"])
                    this.vars!.push(ConfigVarItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetConfigsVarsResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetConfigsVarsResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.vars)) {
            data["vars"] = [];
            for (let item of this.vars)
                data["vars"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetConfigsVarsResponse {
    vars?: ConfigVarItem[] | undefined;
}

export class ConfigVarItem implements IConfigVarItem {
    id!: number;
    name?: string | undefined;
    comment?: string | undefined;
    values?: ConfigVarValueItem[] | undefined;

    constructor(data?: IConfigVarItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.comment = _data["comment"];
            if (Array.isArray(_data["values"])) {
                this.values = [] as any;
                for (let item of _data["values"])
                    this.values!.push(ConfigVarValueItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ConfigVarItem {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigVarItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["comment"] = this.comment;
        if (Array.isArray(this.values)) {
            data["values"] = [];
            for (let item of this.values)
                data["values"].push(item.toJSON());
        }
        return data;
    }
}

export interface IConfigVarItem {
    id: number;
    name?: string | undefined;
    comment?: string | undefined;
    values?: ConfigVarValueItem[] | undefined;
}

export class ConfigVarValueItem implements IConfigVarValueItem {
    id!: number;
    value?: string | undefined;

    constructor(data?: IConfigVarValueItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): ConfigVarValueItem {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigVarValueItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["value"] = this.value;
        return data;
    }
}

export interface IConfigVarValueItem {
    id: number;
    value?: string | undefined;
}

export class AddOrUpdateConfigsRequest implements IAddOrUpdateConfigsRequest {
    name?: string | undefined;
    comment?: string | undefined;
    isDefault!: boolean;
    variables?: AddOrUpdateConfigVariable[] | undefined;

    constructor(data?: IAddOrUpdateConfigsRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.comment = _data["comment"];
            this.isDefault = _data["isDefault"];
            if (Array.isArray(_data["variables"])) {
                this.variables = [] as any;
                for (let item of _data["variables"])
                    this.variables!.push(AddOrUpdateConfigVariable.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AddOrUpdateConfigsRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateConfigsRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["comment"] = this.comment;
        data["isDefault"] = this.isDefault;
        if (Array.isArray(this.variables)) {
            data["variables"] = [];
            for (let item of this.variables)
                data["variables"].push(item.toJSON());
        }
        return data;
    }
}

export interface IAddOrUpdateConfigsRequest {
    name?: string | undefined;
    comment?: string | undefined;
    isDefault: boolean;
    variables?: AddOrUpdateConfigVariable[] | undefined;
}

export class AddOrUpdateConfigVariable implements IAddOrUpdateConfigVariable {
    id?: number | undefined;
    variableId!: number;
    valueId!: number;

    constructor(data?: IAddOrUpdateConfigVariable) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.variableId = _data["variableId"];
            this.valueId = _data["valueId"];
        }
    }

    static fromJS(data: any): AddOrUpdateConfigVariable {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateConfigVariable();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["variableId"] = this.variableId;
        data["valueId"] = this.valueId;
        return data;
    }
}

export interface IAddOrUpdateConfigVariable {
    id?: number | undefined;
    variableId: number;
    valueId: number;
}

export class AddOrUpdateConfigVarRequest implements IAddOrUpdateConfigVarRequest {
    name?: string | undefined;
    comment?: string | undefined;
    values?: AddOrUpdateConfigVarValue[] | undefined;

    constructor(data?: IAddOrUpdateConfigVarRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.comment = _data["comment"];
            if (Array.isArray(_data["values"])) {
                this.values = [] as any;
                for (let item of _data["values"])
                    this.values!.push(AddOrUpdateConfigVarValue.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AddOrUpdateConfigVarRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateConfigVarRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["comment"] = this.comment;
        if (Array.isArray(this.values)) {
            data["values"] = [];
            for (let item of this.values)
                data["values"].push(item.toJSON());
        }
        return data;
    }
}

export interface IAddOrUpdateConfigVarRequest {
    name?: string | undefined;
    comment?: string | undefined;
    values?: AddOrUpdateConfigVarValue[] | undefined;
}

export class AddOrUpdateConfigVarValue implements IAddOrUpdateConfigVarValue {
    id?: number | undefined;
    value?: string | undefined;

    constructor(data?: IAddOrUpdateConfigVarValue) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): AddOrUpdateConfigVarValue {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateConfigVarValue();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["value"] = this.value;
        return data;
    }
}

export interface IAddOrUpdateConfigVarValue {
    id?: number | undefined;
    value?: string | undefined;
}

export class GetSuiteTestPointsResponse implements IGetSuiteTestPointsResponse {
    points?: SuiteTestPointItem[] | undefined;

    constructor(data?: IGetSuiteTestPointsResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["points"])) {
                this.points = [] as any;
                for (let item of _data["points"])
                    this.points!.push(SuiteTestPointItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetSuiteTestPointsResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetSuiteTestPointsResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.points)) {
            data["points"] = [];
            for (let item of this.points)
                data["points"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetSuiteTestPointsResponse {
    points?: SuiteTestPointItem[] | undefined;
}

export class SuiteTestPointItem implements ISuiteTestPointItem {
    id!: number;
    testSuiteId!: number;
    testConfigId!: number;
    testCaseId!: number;
    name?: string | undefined;
    order!: number;
    priority!: number;
    outcome!: Outcome;
    configuration?: string | undefined;
    tester?: string | undefined;
    description?: string | undefined;

    constructor(data?: ISuiteTestPointItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.testSuiteId = _data["testSuiteId"];
            this.testConfigId = _data["testConfigId"];
            this.testCaseId = _data["testCaseId"];
            this.name = _data["name"];
            this.order = _data["order"];
            this.priority = _data["priority"];
            this.outcome = _data["outcome"];
            this.configuration = _data["configuration"];
            this.tester = _data["tester"];
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): SuiteTestPointItem {
        data = typeof data === 'object' ? data : {};
        let result = new SuiteTestPointItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["testSuiteId"] = this.testSuiteId;
        data["testConfigId"] = this.testConfigId;
        data["testCaseId"] = this.testCaseId;
        data["name"] = this.name;
        data["order"] = this.order;
        data["priority"] = this.priority;
        data["outcome"] = this.outcome;
        data["configuration"] = this.configuration;
        data["tester"] = this.tester;
        data["description"] = this.description;
        return data;
    }
}

export interface ISuiteTestPointItem {
    id: number;
    testSuiteId: number;
    testConfigId: number;
    testCaseId: number;
    name?: string | undefined;
    order: number;
    priority: number;
    outcome: Outcome;
    configuration?: string | undefined;
    tester?: string | undefined;
    description?: string | undefined;
}

export enum Outcome {
    Unknow = 0,
    Planed = 1,
    Passed = 2,
    Failed = 3,
    Blocked = 4,
    Skipped = 5,
    Paused = 6,
}

export class SetTesterRequest implements ISetTesterRequest {
    testPointIds?: number[] | undefined;
    testerId!: number;

    constructor(data?: ISetTesterRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["testPointIds"])) {
                this.testPointIds = [] as any;
                for (let item of _data["testPointIds"])
                    this.testPointIds!.push(item);
            }
            this.testerId = _data["testerId"];
        }
    }

    static fromJS(data: any): SetTesterRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SetTesterRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.testPointIds)) {
            data["testPointIds"] = [];
            for (let item of this.testPointIds)
                data["testPointIds"].push(item);
        }
        data["testerId"] = this.testerId;
        return data;
    }
}

export interface ISetTesterRequest {
    testPointIds?: number[] | undefined;
    testerId: number;
}

export class SetOutcomeRequest implements ISetOutcomeRequest {
    testPointIds?: number[] | undefined;
    outcome!: Outcome;

    constructor(data?: ISetOutcomeRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["testPointIds"])) {
                this.testPointIds = [] as any;
                for (let item of _data["testPointIds"])
                    this.testPointIds!.push(item);
            }
            this.outcome = _data["outcome"];
        }
    }

    static fromJS(data: any): SetOutcomeRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SetOutcomeRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.testPointIds)) {
            data["testPointIds"] = [];
            for (let item of this.testPointIds)
                data["testPointIds"].push(item);
        }
        data["outcome"] = this.outcome;
        return data;
    }
}

export interface ISetOutcomeRequest {
    testPointIds?: number[] | undefined;
    outcome: Outcome;
}

export class SetDescriptionRequest implements ISetDescriptionRequest {
    testPointIds?: number[] | undefined;
    description?: string | undefined;

    constructor(data?: ISetDescriptionRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["testPointIds"])) {
                this.testPointIds = [] as any;
                for (let item of _data["testPointIds"])
                    this.testPointIds!.push(item);
            }
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): SetDescriptionRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SetDescriptionRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.testPointIds)) {
            data["testPointIds"] = [];
            for (let item of this.testPointIds)
                data["testPointIds"].push(item);
        }
        data["description"] = this.description;
        return data;
    }
}

export interface ISetDescriptionRequest {
    testPointIds?: number[] | undefined;
    description?: string | undefined;
}

export class AddRunRequest implements IAddRunRequest {
    isAutomated!: boolean;
    name?: string | undefined;

    constructor(data?: IAddRunRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.isAutomated = _data["isAutomated"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): AddRunRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddRunRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isAutomated"] = this.isAutomated;
        data["name"] = this.name;
        return data;
    }
}

export interface IAddRunRequest {
    isAutomated: boolean;
    name?: string | undefined;
}

export class TestResultRequest implements ITestResultRequest {
    automatedTestId?: string | undefined;
    automatedTestName?: string | undefined;
    automatedTestStorage?: string | undefined;
    computerName?: string | undefined;
    startedDate!: Date;
    errorMessage?: string | undefined;
    outCome!: Outcome;
    stackTrace?: string | undefined;
    completedDate!: Date;
    description?: string | undefined;

    constructor(data?: ITestResultRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.automatedTestId = _data["automatedTestId"];
            this.automatedTestName = _data["automatedTestName"];
            this.automatedTestStorage = _data["automatedTestStorage"];
            this.computerName = _data["computerName"];
            this.startedDate = _data["startedDate"] ? new Date(_data["startedDate"].toString()) : <any>undefined;
            this.errorMessage = _data["errorMessage"];
            this.outCome = _data["outCome"];
            this.stackTrace = _data["stackTrace"];
            this.completedDate = _data["completedDate"] ? new Date(_data["completedDate"].toString()) : <any>undefined;
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): TestResultRequest {
        data = typeof data === 'object' ? data : {};
        let result = new TestResultRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["automatedTestId"] = this.automatedTestId;
        data["automatedTestName"] = this.automatedTestName;
        data["automatedTestStorage"] = this.automatedTestStorage;
        data["computerName"] = this.computerName;
        data["startedDate"] = this.startedDate ? this.startedDate.toISOString() : <any>undefined;
        data["errorMessage"] = this.errorMessage;
        data["outCome"] = this.outCome;
        data["stackTrace"] = this.stackTrace;
        data["completedDate"] = this.completedDate ? this.completedDate.toISOString() : <any>undefined;
        data["description"] = this.description;
        return data;
    }
}

export interface ITestResultRequest {
    automatedTestId?: string | undefined;
    automatedTestName?: string | undefined;
    automatedTestStorage?: string | undefined;
    computerName?: string | undefined;
    startedDate: Date;
    errorMessage?: string | undefined;
    outCome: Outcome;
    stackTrace?: string | undefined;
    completedDate: Date;
    description?: string | undefined;
}

export class TestRunPoint implements ITestRunPoint {
    id!: number;
    automatedTestId?: string | undefined;
    automatedTestName?: string | undefined;
    automatedTestStorage?: string | undefined;
    description?: string | undefined;
    computerName?: string | undefined;
    startedDate!: Date;
    errorMessage?: string | undefined;
    outCome!: Outcome;
    owner?: UserIdentity | undefined;
    stackTrace?: string | undefined;
    completedDate!: Date;
    files?: TestPointFile[] | undefined;

    constructor(data?: ITestRunPoint) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.automatedTestId = _data["automatedTestId"];
            this.automatedTestName = _data["automatedTestName"];
            this.automatedTestStorage = _data["automatedTestStorage"];
            this.description = _data["description"];
            this.computerName = _data["computerName"];
            this.startedDate = _data["startedDate"] ? new Date(_data["startedDate"].toString()) : <any>undefined;
            this.errorMessage = _data["errorMessage"];
            this.outCome = _data["outCome"];
            this.owner = _data["owner"] ? UserIdentity.fromJS(_data["owner"]) : <any>undefined;
            this.stackTrace = _data["stackTrace"];
            this.completedDate = _data["completedDate"] ? new Date(_data["completedDate"].toString()) : <any>undefined;
            if (Array.isArray(_data["files"])) {
                this.files = [] as any;
                for (let item of _data["files"])
                    this.files!.push(TestPointFile.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TestRunPoint {
        data = typeof data === 'object' ? data : {};
        let result = new TestRunPoint();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["automatedTestId"] = this.automatedTestId;
        data["automatedTestName"] = this.automatedTestName;
        data["automatedTestStorage"] = this.automatedTestStorage;
        data["description"] = this.description;
        data["computerName"] = this.computerName;
        data["startedDate"] = this.startedDate ? this.startedDate.toISOString() : <any>undefined;
        data["errorMessage"] = this.errorMessage;
        data["outCome"] = this.outCome;
        data["owner"] = this.owner ? this.owner.toJSON() : <any>undefined;
        data["stackTrace"] = this.stackTrace;
        data["completedDate"] = this.completedDate ? this.completedDate.toISOString() : <any>undefined;
        if (Array.isArray(this.files)) {
            data["files"] = [];
            for (let item of this.files)
                data["files"].push(item.toJSON());
        }
        return data;
    }
}

export interface ITestRunPoint {
    id: number;
    automatedTestId?: string | undefined;
    automatedTestName?: string | undefined;
    automatedTestStorage?: string | undefined;
    description?: string | undefined;
    computerName?: string | undefined;
    startedDate: Date;
    errorMessage?: string | undefined;
    outCome: Outcome;
    owner?: UserIdentity | undefined;
    stackTrace?: string | undefined;
    completedDate: Date;
    files?: TestPointFile[] | undefined;
}

export class TestPointFile implements ITestPointFile {
    id!: number;
    name?: string | undefined;

    constructor(data?: ITestPointFile) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): TestPointFile {
        data = typeof data === 'object' ? data : {};
        let result = new TestPointFile();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data;
    }
}

export interface ITestPointFile {
    id: number;
    name?: string | undefined;
}

export class GetSuiteTestCasesResponse implements IGetSuiteTestCasesResponse {
    tests?: SuiteTestCaseItem[] | undefined;

    constructor(data?: IGetSuiteTestCasesResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["tests"])) {
                this.tests = [] as any;
                for (let item of _data["tests"])
                    this.tests!.push(SuiteTestCaseItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetSuiteTestCasesResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetSuiteTestCasesResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.tests)) {
            data["tests"] = [];
            for (let item of this.tests)
                data["tests"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetSuiteTestCasesResponse {
    tests?: SuiteTestCaseItem[] | undefined;
}

export class SuiteTestCaseItem implements ISuiteTestCaseItem {
    id!: number;
    testCaseId!: number;
    name?: string | undefined;
    order!: number;
    state!: WiState;
    priority!: number;

    constructor(data?: ISuiteTestCaseItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.testCaseId = _data["testCaseId"];
            this.name = _data["name"];
            this.order = _data["order"];
            this.state = _data["state"];
            this.priority = _data["priority"];
        }
    }

    static fromJS(data: any): SuiteTestCaseItem {
        data = typeof data === 'object' ? data : {};
        let result = new SuiteTestCaseItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["testCaseId"] = this.testCaseId;
        data["name"] = this.name;
        data["order"] = this.order;
        data["state"] = this.state;
        data["priority"] = this.priority;
        return data;
    }
}

export interface ISuiteTestCaseItem {
    id: number;
    testCaseId: number;
    name?: string | undefined;
    order: number;
    state: WiState;
    priority: number;
}

export class AddTestCaseToSuiteRequest implements IAddTestCaseToSuiteRequest {
    testCasesIds?: number[] | undefined;

    constructor(data?: IAddTestCaseToSuiteRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["testCasesIds"])) {
                this.testCasesIds = [] as any;
                for (let item of _data["testCasesIds"])
                    this.testCasesIds!.push(item);
            }
        }
    }

    static fromJS(data: any): AddTestCaseToSuiteRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddTestCaseToSuiteRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.testCasesIds)) {
            data["testCasesIds"] = [];
            for (let item of this.testCasesIds)
                data["testCasesIds"].push(item);
        }
        return data;
    }
}

export interface IAddTestCaseToSuiteRequest {
    testCasesIds?: number[] | undefined;
}

export class DeleteTestCaseFromSuiteRequest implements IDeleteTestCaseFromSuiteRequest {
    suiteTestCasesIds?: number[] | undefined;

    constructor(data?: IDeleteTestCaseFromSuiteRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["suiteTestCasesIds"])) {
                this.suiteTestCasesIds = [] as any;
                for (let item of _data["suiteTestCasesIds"])
                    this.suiteTestCasesIds!.push(item);
            }
        }
    }

    static fromJS(data: any): DeleteTestCaseFromSuiteRequest {
        data = typeof data === 'object' ? data : {};
        let result = new DeleteTestCaseFromSuiteRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.suiteTestCasesIds)) {
            data["suiteTestCasesIds"] = [];
            for (let item of this.suiteTestCasesIds)
                data["suiteTestCasesIds"].push(item);
        }
        return data;
    }
}

export interface IDeleteTestCaseFromSuiteRequest {
    suiteTestCasesIds?: number[] | undefined;
}

export class ReorderTestCasesRequest implements IReorderTestCasesRequest {
    suiteTestCaseOrderDictionary?: { [key: string]: number; } | undefined;

    constructor(data?: IReorderTestCasesRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (_data["suiteTestCaseOrderDictionary"]) {
                this.suiteTestCaseOrderDictionary = {} as any;
                for (let key in _data["suiteTestCaseOrderDictionary"]) {
                    if (_data["suiteTestCaseOrderDictionary"].hasOwnProperty(key))
                        (<any>this.suiteTestCaseOrderDictionary)![key] = _data["suiteTestCaseOrderDictionary"][key];
                }
            }
        }
    }

    static fromJS(data: any): ReorderTestCasesRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ReorderTestCasesRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.suiteTestCaseOrderDictionary) {
            data["suiteTestCaseOrderDictionary"] = {};
            for (let key in this.suiteTestCaseOrderDictionary) {
                if (this.suiteTestCaseOrderDictionary.hasOwnProperty(key))
                    (<any>data["suiteTestCaseOrderDictionary"])[key] = (<any>this.suiteTestCaseOrderDictionary)[key];
            }
        }
        return data;
    }
}

export interface IReorderTestCasesRequest {
    suiteTestCaseOrderDictionary?: { [key: string]: number; } | undefined;
}

export class SetTestCaseConfigRequest implements ISetTestCaseConfigRequest {
    suiteTestCaseIds?: number[] | undefined;
    testConfigIds?: number[] | undefined;

    constructor(data?: ISetTestCaseConfigRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["suiteTestCaseIds"])) {
                this.suiteTestCaseIds = [] as any;
                for (let item of _data["suiteTestCaseIds"])
                    this.suiteTestCaseIds!.push(item);
            }
            if (Array.isArray(_data["testConfigIds"])) {
                this.testConfigIds = [] as any;
                for (let item of _data["testConfigIds"])
                    this.testConfigIds!.push(item);
            }
        }
    }

    static fromJS(data: any): SetTestCaseConfigRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SetTestCaseConfigRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.suiteTestCaseIds)) {
            data["suiteTestCaseIds"] = [];
            for (let item of this.suiteTestCaseIds)
                data["suiteTestCaseIds"].push(item);
        }
        if (Array.isArray(this.testConfigIds)) {
            data["testConfigIds"] = [];
            for (let item of this.testConfigIds)
                data["testConfigIds"].push(item);
        }
        return data;
    }
}

export interface ISetTestCaseConfigRequest {
    suiteTestCaseIds?: number[] | undefined;
    testConfigIds?: number[] | undefined;
}

export class GetConfigsForAssignResponse implements IGetConfigsForAssignResponse {
    configs?: ConfigsForAssign[] | undefined;

    constructor(data?: IGetConfigsForAssignResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["configs"])) {
                this.configs = [] as any;
                for (let item of _data["configs"])
                    this.configs!.push(ConfigsForAssign.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetConfigsForAssignResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetConfigsForAssignResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.configs)) {
            data["configs"] = [];
            for (let item of this.configs)
                data["configs"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetConfigsForAssignResponse {
    configs?: ConfigsForAssign[] | undefined;
}

export class ConfigsForAssign implements IConfigsForAssign {
    id!: number;
    name?: string | undefined;
    values?: string | undefined;

    constructor(data?: IConfigsForAssign) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.values = _data["values"];
        }
    }

    static fromJS(data: any): ConfigsForAssign {
        data = typeof data === 'object' ? data : {};
        let result = new ConfigsForAssign();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["values"] = this.values;
        return data;
    }
}

export interface IConfigsForAssign {
    id: number;
    name?: string | undefined;
    values?: string | undefined;
}

export class SetTestSuiteConfigRequest implements ISetTestSuiteConfigRequest {
    testConfigIds?: number[] | undefined;

    constructor(data?: ISetTestSuiteConfigRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["testConfigIds"])) {
                this.testConfigIds = [] as any;
                for (let item of _data["testConfigIds"])
                    this.testConfigIds!.push(item);
            }
        }
    }

    static fromJS(data: any): SetTestSuiteConfigRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SetTestSuiteConfigRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.testConfigIds)) {
            data["testConfigIds"] = [];
            for (let item of this.testConfigIds)
                data["testConfigIds"].push(item);
        }
        return data;
    }
}

export interface ISetTestSuiteConfigRequest {
    testConfigIds?: number[] | undefined;
}

export class AddOrUpdateSuiteRequest implements IAddOrUpdateSuiteRequest {
    parentId!: number;
    name?: string | undefined;

    constructor(data?: IAddOrUpdateSuiteRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.parentId = _data["parentId"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): AddOrUpdateSuiteRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddOrUpdateSuiteRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["parentId"] = this.parentId;
        data["name"] = this.name;
        return data;
    }
}

export interface IAddOrUpdateSuiteRequest {
    parentId: number;
    name?: string | undefined;
}

export class MoveSuiteRequest implements IMoveSuiteRequest {
    newParentId!: number;

    constructor(data?: IMoveSuiteRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.newParentId = _data["newParentId"];
        }
    }

    static fromJS(data: any): MoveSuiteRequest {
        data = typeof data === 'object' ? data : {};
        let result = new MoveSuiteRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["newParentId"] = this.newParentId;
        return data;
    }
}

export interface IMoveSuiteRequest {
    newParentId: number;
}

export interface FileParameter {
    data: any;
    fileName: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}