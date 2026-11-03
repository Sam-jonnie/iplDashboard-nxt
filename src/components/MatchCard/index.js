import './index.css'

const MatchCard = props => {
  const {matchCards} = props
  const status = matchCards.matchStatus
  const statusColor = status === 'Won' ? 'won' : ''

  return (
    <li className="match-card-container">
      <img
        className="matchcard-logo"
        src={matchCards.competingTeamLogo}
        alt={`competing team ${matchCards.competingTeam}`}
      />
      <p className="matchcard-competing-team">{matchCards.competingTeam}</p>
      <p className="matchcard-result">{matchCards.result}</p>
      <p className={`matchcard-status ${statusColor}`}>
        {matchCards.matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
