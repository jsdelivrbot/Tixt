import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './style.css';
import Vehicules from '../../components/Vehicules';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class HomeLayout extends Component {
    render() {
        return (
            <div className="wrapper-home">
                    <Header />
                    <Vehicules />
                    <Footer />
            </div>
        );
    }
}
