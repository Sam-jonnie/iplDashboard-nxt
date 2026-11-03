import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamCardDetail: [], isLoading: true}

  componentDidMount() {
    this.getTeamCardArray()
  }

  getTeamCardArray = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)
    const formattedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    console.log(formattedData)

    this.setState({teamCardDetail: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, teamCardDetail} = this.state
    console.log(teamCardDetail)

    return (
      <div className="home-background">
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="container-width">
            <div className="ipl-logo-text">
              <img
                alt="ipl logo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                className="ipl-image"
              />
              <h1 className="ipl-heading">IPL Dashboard</h1>
            </div>
            <ul className="ul-lists">
              {teamCardDetail.map(eachItem => (
                <TeamCard eachItem={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
