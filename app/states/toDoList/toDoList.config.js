import './toDoList.style.scss';
import { ToDoListController } from './toDoList.controller';
import ToDoListTemplate from './toDoList.template.html';

export const stateConfig = {
    url: '/to-do-list',
    params: {},
    template: ToDoListTemplate,
    controller: ToDoListController,
    controllerAs: 'vm'
};
