import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BasicAutocomplete from '../basicAutocomplete';
import ValidatedInput from '../../common/ValidatedInput';

import Resources from './resources';


class Skills extends Component {
  state = {
    skill: {
      description: '',
      level: 0
    },
    items: [
      'a',
      'ab',
      'abc',
      'abcd'
    ]
  }

  componentWillMount() {
    // _.isEmpty(this.props.professionCategories) &&
    //   this.props.getProfessions();
    //todo get skills from api
  }

  addItem = () => {
    const { skill } = this.state;
    this.props.addSkill(skill);
    this.setState({ skill: { level: 0, description: '' } });
  }

  onChangeDescription = (value) => {
    this.setState({ skill: { ...this.state.skill, description: value } });
  }

  onChangeLevel = ({ target: { value } }) => {
    this.setState({ skill: { ...this.state.skill, level: parseInt(value) } });
  }

  renderLevelScale = (scale, level) => {
    const levels = [];
    for (let i = 1; i <= scale; i++) {
      levels[i - 1] = this.renderRadioInput(i, level);
    }
    return levels;
  }

  renderRadioInput = (value, level) => (
    <div key={value}>
      <input type="radio" onClick={this.onChangeLevel} value={value} id={`radio${value}`} name="skillLevel" checked={value === level} />
      <label htmlFor={`radio${value}`}>{Resources[value]}</label>
    </div>
  );

  renderAddedSkills = () => {
    const { addedSkills } = this.props;
    return (
      <div key="addedSkils" className="added-skills">
        {addedSkills.map(({ description, level }, index) => <div className="added-skill" key={index}>{`${description} ${Resources[level].toLowerCase()}`}</div>)}
      </div>
    );
  }

  render() {
    const { skill, items } = this.state;
    const { description, level } = skill;

    return [
      <div key="skill" className="skill-form">
        <ValidatedInput errorMessage="">
          <BasicAutocomplete
            value={description}
            onChange={this.onChangeDescription}
            placeholder={Resources.skillDescription}
            items={items}
          />
        </ValidatedInput>
        <ValidatedInput errorMessage="">
          <div className="level-scale" key="scale">
            <p>{Resources.skillLevel}</p>
            {this.renderLevelScale(5, level)}
          </div>
        </ValidatedInput>
        <button onClick={this.addItem} className="btn btn-primary full-width">{Resources.submit}</button>
      </div>,
      this.renderAddedSkills()
    ];
  }
}

Skills.propTypes = {
  addSkill: PropTypes.func.isRequired,
  addedSkills: PropTypes.array
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(null, mapDispatchToProps)(Skills);
