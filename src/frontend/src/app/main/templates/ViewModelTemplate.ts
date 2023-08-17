import { ControlVm, NameSpaceVm, SearchProperty, ViewModel } from "../viewmodel";
import { Outcome, WiState } from "src/app/api/reports/swagger";

export class ViewModelTemplate {
    static Create(): ViewModelTemplate {
        let result = new ViewModel({ 
            framework: "playwrite",
            fileName: "uimap.xml",
            rootNs: new NameSpaceVm({
                name: "google",
                comment: "google.com",
                children:[
                    new NameSpaceVm(
                        {
                            name: "main",
                            comment: "Main page",
                            controls: [
                                new ControlVm(
                                    {
                                        name: "search",
                                        role: "textinput",
                                        comment: "input search text",
                                        searchProps: [
                                            new SearchProperty()
                                            {
                                                name: "xpath",
                                                value: ".//[text(text)]"
                                            }
                                        ]
                                    }),
                                new ControlVm(
                                    {
                                        name: "screen board",
                                        role: "button",
                                    }),
                                new ControlVm(
                                    {
                                        name: "search by image",
                                        role: "button",
                                    }),
                                new ControlVm(
                                    {
                                        name: "search",
                                        role: "button",
                                    }),
                                new ControlVm(
                                    {
                                        name: "random_search",
                                        role: "button",
                                    }),
                            ]
                        }
                    )
                ]
            })
            // seleniumConnectionString: 1,
            // planId: 1,
            // navigationLinks: [
            //     NavigationLink.Root(),
            //     NavigationLink.Project(1, "Demo project"),
            //     NavigationLink.Current("Test plan: All Tests"),
            // ],
            // testPlanName: "All Tests",
            // rootNs: new NameSpaceVm({
            //     name: "All Tests",
            //     id: 321321,
            //     expanded: true,
            //     children: [
            //         new NameSpaceVm({
            //             name: "Gmail",
            //             expanded: true,
            //             children: [
            //                 new NameSpaceVm({
            //                     name: "Авторизация"
            //                 }),
            //                 new NameSpaceVm({
            //                     name: "Отправка сообщений",
            //                     expanded: true,
            //                     children: [
            //                         new NameSpaceVm({
            //                             name: "Из черновиков"
            //                         }),
            //                         new NameSpaceVm({
            //                             name: "Из шаблонов"
            //                         })
            //                     ]
            //                 })
            //             ]
            //         }),
            //         new NameSpaceVm({
            //             name: "Drive"
            //         })
            //     ]
            // }),
            // defineTests: [
            //     new DefineTestCaseVm({ id: 101111, selected: true, name: "Авторизация", order: 1, state: WiState.Design, priority: 1,  }),
            //     new DefineTestCaseVm({ id: 101112, selected: true, name: "Отправка сообщения", order: 2, state: WiState.Ready, priority: 2 }),
            //     new DefineTestCaseVm({ id: 101113, selected: true, name: "Отправка сообщения", order: 3, state: WiState.Closed, priority: 3 }),
            //     new DefineTestCaseVm({ id: 101114, selected: true, name: "Прием сообщений", order: 4, state: WiState.Closed, priority: 4 }),
            // ],
            // executeTests:[
            //     new ExecuteTestCaseVm({ pointId: 1, testcaseId: 101111, selected: true, name: "Авторизация", order: 1, configuration: "Windows 10", priority: 1, outcome: Outcome.Passed, tester: "Иван Иванов"  }),
            //     new ExecuteTestCaseVm({ pointId: 2, testcaseId: 101112, selected: true, name: "Отправка сообщения", order: 2, configuration: "Windows 10", priority: 1, outcome: Outcome.Failed, tester: "Иван Иванов"  })
            // ]

        });
        
        return result;
    }
    
}
