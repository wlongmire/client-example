import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Home/actions';
import styles from './styles';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const ChoicePage = (props) =>(
    <div className="wrapper">
    <h3 className="text-center">Which type would you like to submit?</h3>
    <table className="table-choice">
    <tbody>
    <tr>
    <td className="text-center td-choice">
    <a onClick={()=> props.resetForm()}>
    <p><strong>OI</strong></p>
    <p>Owner's Interest</p>
    </a>
    </td>
    <td className="text-center middle-td">OR</td>
    <td className="text-center td-choice">
    <a onClick={()=> props.resetContractorsForm()}><p><strong>OCP</strong></p>
    <p>Owners & Contractors Protective</p>
    </a>
    </td>
    </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><br/><Button onClick={()=> {browserHistory.push('/home'); }}>Go Back To Submissions</Button></td>
      </tr>  
    </tfoot>
    </table>
    
    </div>
);

export default connect(null, actions)(ChoicePage);