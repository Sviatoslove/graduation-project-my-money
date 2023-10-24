import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

// history.listen((history) => {
//   console.log("history:", history);
//   // this is called whenever new locations come in
//   // the action is POP, PUSH, or REPLACE
// });

export default history
