import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from 'react-router-dom';

LinkWithQuery.propTypes = {
  children: PropTypes.object,
  to: PropTypes.object
};

NavLinkWithQuery.propTypes = {
  children: PropTypes.object,
  to: PropTypes.object
};

export function LinkWithQuery({ children, to, ...props }) {
  let { search } = useLocation();
  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
}

export function NavLinkWithQuery({ children, to, ...props }) {
  let { search } = useLocation();
  return (
    <NavLink to={to + search} {...props}>
      {children}
    </NavLink>
  );
}