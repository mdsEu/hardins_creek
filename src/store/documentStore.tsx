import { createStore, createHook, Action } from 'react-sweet-state';



type State = {
  bodyClasses: Array<string>,
  strBodyClasses: String,
  previousPage: String,
};
type Actions = typeof actions;

const name = 'Document'

const initialState = {
  bodyClasses: ['my_body'],
  strBodyClasses: 'my_body',
  previousPage: '',
};

const actions = {
  addBodyClass: (nameCssClass : string) => ({ getState, setState } : {getState: any, setState: any}) => {
    const currentClasses = getState().bodyClasses;
    if(currentClasses.indexOf(nameCssClass) === -1) {
      currentClasses.push(nameCssClass);

      setState({
        strBodyClasses: currentClasses.join(' '),
        bodyClasses: currentClasses,
      });
    }
  },
  removeBodyClass: (nameCssClass : string) => ({ getState, setState } : {getState: any, setState: any}) => {
    const currentClasses = getState().bodyClasses;
    const indexFound = currentClasses.indexOf(nameCssClass);
    if(indexFound !== -1) {
      currentClasses.splice(indexFound, 1);

      setState({
        strBodyClasses: currentClasses.join(' '),
        bodyClasses: currentClasses,
      });
    }
  },
  setPreviousPage: (previousPage : string) => ({ getState, setState } : {getState: any, setState: any}) => {
    setState({
      previousPage,
    });
  }

}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

export default createHook(Store);
