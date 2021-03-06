import { Switch, Route, Link } from 'react-router-dom';
import './LinkComponentNavigation.scss';

export const LinkComponentNavigation = ({ linkPath }) => {
  return (
    <Switch>
      <Route exact path="/">
        <div className="link-component-navigation link-component-navigation-show-details">
          <Link to={linkPath}>
            Show details <i className="fas fa-arrow-right show-details-arrow"></i>
          </Link>
        </div>
      </Route>
      <Route path={linkPath}>
        <div className="link-component-navigation link-component-navigation-go-back">
          <div className="link-component-navigation-go-back-arrow-wrapper" onClick={() => {window.history.back()}}>
            <i className="fas fa-arrow-left go-back-arrow"></i> Go back
          </div>
        </div>
      </Route>
    </Switch>
  )
}
