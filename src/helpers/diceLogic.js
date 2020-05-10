// Logic to determine scores

export default {
  oneDieRoll(roll) {
    this.rollResult.roll = roll
    const onesAndFives = this.checkForOnesAndFives(roll)
    this.rollResult.score = onesAndFives
    this.rollResult.success = this.rollResult.score > 0 ? true : false
  },
  twoDieRoll(roll) {
    this.rollResult.roll = roll
    const onesAndFives = this.checkForOnesAndFives(roll)
    this.rollResult.score = onesAndFives
    this.rollResult.success = this.rollResult.score > 0 ? true : false
  },
  threeDieRoll(roll) {
    this.rollResult.roll = roll
    // Check for three of a kind
    if (roll[0] === roll[1] && roll[1] === roll[2]) {
      const tripleScore = roll[0] * (roll[0] === 1 ? 1000 : 100)
      this.scoringDice.push({type: `${roll[0]}s`, score: tripleScore, dice: 3})

      this.rollResult.tripleExists = true
      this.rollResult.score = tripleScore
      this.rollResult.success = true
    } else {
      const onesAndFives = this.checkForOnesAndFives(roll)
      this.rollResult.score = onesAndFives
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    }
  },
  fourDieRoll(roll) {
    this.rollResult.roll = roll
    // Check for three of a kind
    for (const x of roll) {
      let likeDice = roll.filter(y => y === x)
      if (likeDice.length === 3) {
        const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
        this.scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
        const unlikeDice = roll.filter(i => i !== likeDice[0])
        const onesAndFives = this.checkForOnesAndFives(unlikeDice)

        this.rollResult.tripleExists = true
        this.rollResult.score = tripleScore + onesAndFives
        this.rollResult.success = true
        return
      }
    }
    // Check for four of a kind
    if (roll.every(x => x === roll[0])) {
      const quadScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2
      this.scoringDice.push({type: `${roll[0]}s`, score: quadScore, dice: 4})

      this.rollResult.quadExists = true
      this.rollResult.score = quadScore
      this.rollResult.success = true
    } else {
      const onesAndFives = this.checkForOnesAndFives(roll)
      this.rollResult.score = onesAndFives
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    }
  },
  fiveDieRoll(roll) {
    this.rollResult.roll = roll
    // Checks for three of a kind or four of a kind
    for (const x of roll) {
      let likeDice = roll.filter(y => y === x)
      const unlikeDice = roll.filter(i => i !== likeDice[0])
      if (likeDice.length === 3) {
        const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
        this.scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
        const onesAndFives = this.checkForOnesAndFives(unlikeDice)

        this.rollResult.tripleExists = true
        this.rollResult.score = tripleScore + onesAndFives
        this.rollResult.success = true
        return
      }
      if (likeDice.length === 4) {
        const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
        this.scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
        const onesAndFives = this.checkForOnesAndFives(unlikeDice)

        this.rollResult.quadExists = true
        this.rollResult.score = quadScore + onesAndFives
        this.rollResult.success = true
        return
      }
    }
    // Checks for five of a kind
    if (roll.every(x => x === roll[0])) {
      const quintScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2 * 2
      this.scoringDice.push({type: `${roll[0]}s`, score: quintScore, dice: 5})

      this.rollResult.quintExists = true
      this.rollResult.score = quintScore
      this.rollResult.success = true
    } else {
      const onesAndFives = this.checkForOnesAndFives(roll)
      this.rollResult.score = onesAndFives
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    }
  },
  sixDieRoll(roll) {
    this.rollResult.roll = roll
    let doubleCount = 0
    let tripleCount = 0
    let tripleValues = []
    // Check for two, three, four, or five of a kind
    for (const x of roll) {
      let likeDice = roll.filter(y => y === x)
      const unlikeDice = roll.filter(i => i !== likeDice[0])
      if (likeDice.length === 2) {
        doubleCount++
      }
      if (likeDice.length === 3) {
        this.rollResult.tripleExists = true
        tripleCount++
        if (!tripleValues.includes(likeDice[0])) {
          tripleValues.push(likeDice[0])
        }
      }
      if (likeDice.length === 4) {
        const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
        this.scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
        const onesAndFives = this.checkForOnesAndFives(unlikeDice)

        this.rollResult.quadExists = true
        this.rollResult.score = quadScore + onesAndFives
        this.rollResult.success = true
        return
      }
      if (likeDice.length === 5) {
        const quintScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2 * 2
        this.scoringDice.push({type: `${likeDice[0]}s`, score: quintScore, dice: 5})
        const onesAndFives = this.checkForOnesAndFives(unlikeDice)

        this.rollResult.quadExists = true
        this.rollResult.score = quintScore + onesAndFives
        this.rollResult.success = true
        return
      }
    }
    // Checks for a straight
    if (roll.includes(1) && roll.includes(2) && roll.includes(3) && roll.includes(4) && roll.includes(5) && roll.includes(6)) {
      this.scoringDice.push({type: `Straight`, score: 1500, dice: 6})
      this.rollResult.straight = true
      this.rollResult.score = 1500
      this.rollResult.success = true
    } else if (roll.every(x => x === roll[0])) {
      // Checks for six of a kind
      this.scoringDice.push({type: `SIX of a KIND`, score: 10000, dice: 6})
      this.rollResult.sextExists = true
      this.rollResult.score = 10000
      this.rollResult.success = true
    } else if (doubleCount === 6) {
      // Checks for three pairs
      this.scoringDice.push({type: `Three Pair`, score: 1000, dice: 6})
      this.rollResult.threePairs = true
      this.rollResult.score = 1000
      this.rollResult.success = true
    } else if (tripleCount === 6) {
      // Checks for two three of a kinds
      let tripleScoreA = tripleValues[0] === 1 ? tripleValues[0] * 1000 : tripleValues[0] * 100
      let tripleScoreB = tripleValues[1] === 1 ? tripleValues[1] * 1000 : tripleValues[1] * 100
      this.scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScoreA, dice: 3})
      this.scoringDice.push({type: `${tripleValues[1]}s`, score: tripleScoreB, dice: 3})
      this.rollResult.score = tripleScoreA + tripleScoreB
      this.rollResult.success = true
    } else if (tripleCount === 3) {
      // checks for one three of a kind
      const tripleScore = tripleValues[0] * (tripleValues[0] === 1 ? 1000 : 100)
      const unlikeDice = roll.filter(i => i !== tripleValues[0])
      this.scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScore, dice: 3})
      const onesAndFives = this.checkForOnesAndFives(unlikeDice)
      this.rollResult.tripleExists = true
      this.rollResult.score = tripleScore + onesAndFives
      this.rollResult.success = true
    } else {
      const onesAndFives = this.checkForOnesAndFives(roll)
      this.rollResult.score = onesAndFives
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    }
  }
}