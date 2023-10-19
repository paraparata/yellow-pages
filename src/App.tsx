import ErrorComponent from './components/base/ErrorComponent';
import ContactDetail from './views/ContactDetail';
import ContactEdit from './views/ContactDetail/Edit';
import ContactNew from './views/ContactNew';
import ContactList from './views/ContactList';
import Home from './views/Home';
import { Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from './components/base/ErrorComponent';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ErrorComponent fullScreen {...props} />}
    >
      <Suspense>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/list' component={ContactList} />
          <Route path='/new' component={ContactNew} />
          <Route path='/detail/:id' component={ContactDetail} />
          <Route path='/detail/:id/edit' component={ContactEdit} />
          <Route>
            <ErrorMessage fullScreen errorMsg='404 Not Found' />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
