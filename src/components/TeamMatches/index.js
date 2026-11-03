import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {teamMatches: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachItems => ({
        umpires: eachItems.umpires,
        result: eachItems.result,
        manOfTheMatch: eachItems.man_of_the_match,
        id: eachItems.id,
        date: eachItems.date,
        venue: eachItems.venue,
        competingTeam: eachItems.competing_team,
        competingTeamLogo: eachItems.competing_team_logo,
        firstInnings: eachItems.first_innings,
        secondInnings: eachItems.second_innings,
        matchStatus: eachItems.match_status,
      })),
    }
    this.setState({teamMatches: formattedData, isLoading: false})
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  // Counts won / lost / drawn across the latest match and the recent matches
  getMatchStatistics = () => {
    const {teamMatches} = this.state
    const allMatches = [
      teamMatches.latestMatchDetails,
      ...teamMatches.recentMatches,
    ]
    const count = {won: 0, lost: 0, drawn: 0}

    allMatches.forEach(eachMatch => {
      const status = (eachMatch.matchStatus || '').toLowerCase()
      if (status === 'won') {
        count.won += 1
      } else if (status === 'lost') {
        count.lost += 1
      } else {
        count.drawn += 1
      }
    })

    return [
      {name: 'Won', value: count.won, color: '#18ed66'},
      {name: 'Lost', value: count.lost, color: '#e31a1a'},
      {name: 'Drawn', value: count.drawn, color: '#a3b1c4'},
    ]
  }

  renderPieChart = () => {
    const statistics = this.getMatchStatistics()
    const isDesktop = window.innerWidth >= 768
    const chartWidth = isDesktop ? 500 : 300
    const chartHeight = isDesktop ? 350 : 300

    return (
      <div className="pie-chart-container">
        <h1 className="pie-chart-heading">Match Statistics</h1>
        <PieChart width={chartWidth} height={chartHeight}>
          <Pie
            data={statistics}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius="40%"
            outerRadius="70%"
            isAnimationActive={false}
          >
            {statistics.map(eachItem => (
              <Cell key={eachItem.name} fill={eachItem.color} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </div>
    )
  }

  render() {
    const {teamMatches, isLoading} = this.state

    return (
      <>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="teammatch-container">
            <button
              type="button"
              className="back-button"
              onClick={this.onClickBack}
            >
              Back
            </button>
            <img
              src={teamMatches.teamBannerUrl}
              alt="team banner"
              className="banner-image"
            />
            <p>Latest Matches</p>
            <div className="competing-team-container">
              <div className="result-card">
                <div className="result-card-align">
                  <div className="latest-match-card">
                    <p className="team-match-heading">
                      {teamMatches.latestMatchDetails.competingTeam}
                    </p>
                    <p className="team-match-date">
                      {teamMatches.latestMatchDetails.date}
                    </p>
                    <p className="team-match-venue">
                      {teamMatches.latestMatchDetails.venue}
                    </p>
                    <p className="team-match-result">
                      {teamMatches.latestMatchDetails.result}
                    </p>
                  </div>
                  <img
                    src={teamMatches.latestMatchDetails.competingTeamLogo}
                    alt={`latest match ${teamMatches.latestMatchDetails.competingTeam}`}
                    className="competing-logo"
                  />
                </div>
                <div className="result-card-display">
                  <hr className="line" />
                  <h1 className="latest_match_details-heading">
                    First Innings
                  </h1>
                  <p className="latest_match_details-subheading">
                    {teamMatches.latestMatchDetails.firstInnings}
                  </p>
                  <h1 className="latest_match_details-heading">
                    Second Innings
                  </h1>
                  <p className="latest_match_details-subheading">
                    {teamMatches.latestMatchDetails.secondInnings}
                  </p>
                  <h1 className="latest_match_details-heading">
                    Man Of The Match
                  </h1>
                  <p className="latest_match_details-subheading">
                    {teamMatches.latestMatchDetails.manOfTheMatch}
                  </p>
                  <h1 className="latest_match_details-heading">Umpires</h1>
                  <p className="latest_match_details-subheading">
                    {teamMatches.latestMatchDetails.umpires}
                  </p>
                </div>
              </div>
            </div>
            {this.renderPieChart()}
            <ul className="match-card-containers">
              {teamMatches.recentMatches.map(matchCards => (
                <MatchCard matchCards={matchCards} key={matchCards.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}
export default TeamMatches
