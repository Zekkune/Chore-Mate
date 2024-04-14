import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth'
import { connect } from 'react-redux'

const Navbar = ({ logout, isAuthenticated }) => {

const guestLinks = () => (
    <Fragment>
        <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </a>
    </Fragment>
)

const authLinks = () => (
    <>
    <Link to={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={logout}>
              Logout
            </Link>
    <Link to={'/choremate'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
    Chore-Mate
    </Link>
  </>
)

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="#" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <span className="ml-2 text-white font-bold">Chore-Mate</span>
            </a>
          </div>
          <div className="flex">
            <Link to={'/'}className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
          </div>
          {isAuthenticated ? authLinks() : guestLinks()}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);
