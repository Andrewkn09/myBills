import React, { Component } from 'react';
import Axios from 'axios';
import Company from './Company.jsx';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      selected: '',
      amount: ''
    };
    this.addCompany = this.addCompany.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //get company names from db and update companies list
  updateCompanies() {
    return Axios.get('/companies')
      .then(({ data }) => {
        this.setState({
          companies: data,
          selected: ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.updateCompanies();
  }

  //add company to db, then update company list and selected company
  addCompany(companyName) {
    Axios.post('/companies', { companyName })
      .then(() => {
        return this.updateCompanies();
      })
      .then(() => {
        this.setState({ selected: companyName });
      })
      .catch(err => console.log(err));
  }
  //handle selected value, if selected is Add Company, propt adding of company
  handleSelect(e) {
    var selected = e.target.value;
    if (e.target.value === 'Add Company') {
      let company = prompt('Enter a company');
      this.addCompany(company);
    } else {
      this.setState({ selected });
    }
  }
  //handle amount typed into input
  handleChange(e) {
    this.setState({ amount: e.target.value });
  }
  //On submit, add bill to db, update bills list and reset the form
  handleSubmit(e) {
    e.preventDefault();
    const { selected: companyName, amount } = this.state;
    Axios.post('/bills', { companyName, amount }).then(() => {
      this.props
        .handleUpdate()
        .then(() => {
          this.setState({ amount: '' });
        })
        .catch(err => console.log(err));
    });
  }
  render() {
    const { companies, selected, amount } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Company:
            <select value={selected} onChange={this.handleSelect}>
              <option value='' />
              {companies.map(company => {
                return <Company key={company.id} company={company} />;
              })}
              <option value='Add Company'>Add Company</option>
            </select>
          </label>
          <label>
            Amount:
            <input
              type='number'
              step='0.01'
              value={amount}
              onChange={this.handleChange}
            />
            <input type='submit' value='Submit' />
          </label>
        </form>
      </div>
    );
  }
}
