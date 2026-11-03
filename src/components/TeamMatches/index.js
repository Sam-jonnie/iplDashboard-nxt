import {Component} from 'react'

import Loader from 'react-loader-spinner'
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
    console.log(data)
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

  render() {
    const {teamMatches, isLoading} = this.state
    console.log(teamMatches)

    return (
      <>
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="teammatch-container">
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
