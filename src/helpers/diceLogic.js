// Logic to determine scores

const oneDieRoll = (roll, rollResult, scoringDice) => {
  rollResult.roll = roll
  const onesAndFives = checkForOnesAndFives(roll)
  rollResult.score = onesAndFives
  rollResult.success = rollResult.score > 0 ? true : false
};
const twoDieRoll = (roll, rollResult, scoringDice) => {
  rollResult.roll = roll
  const onesAndFives = checkForOnesAndFives(roll)
  rollResult.score = onesAndFives
  rollResult.success = rollResult.score > 0 ? true : false
};
const threeDieRoll = (roll, rollResult, scoringDice) => {
  rollResult.roll = roll
  // Check for three of a kind
  if (roll[0] === roll[1] && roll[1] === roll[2]) {
    const tripleScore = roll[0] * (roll[0] === 1 ? 1000 : 100)
    scoringDice.push({type: `${roll[0]}s`, score: tripleScore, dice: 3})

    rollResult.tripleExists = true
    rollResult.score = tripleScore
    rollResult.success = true
  } else {
    const onesAndFives = checkForOnesAndFives(roll)
    rollResult.score = onesAndFives
    rollResult.success = rollResult.score > 0 ? true : false
  }
};
const fourDieRoll = (roll, rollResult, scoringDice) => {
  rollResult.roll = roll
  // Check for three of a kind
  for (const x of roll) {
    let likeDice = roll.filter(y => y === x)
    if (likeDice.length === 3) {
      const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
      scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
      const unlikeDice = roll.filter(i => i !== likeDice[0])
      const onesAndFives = checkForOnesAndFives(unlikeDice)

      rollResult.tripleExists = true
      rollResult.score = tripleScore + onesAndFives
      rollResult.success = true
      return
    }
  }
  // Check for four of a kind
  if (roll.every(x => x === roll[0])) {
    const quadScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2
    scoringDice.push({type: `${roll[0]}s`, score: quadScore, dice: 4})

    rollResult.quadExists = true
    rollResult.score = quadScore
    rollResult.success = true
  } else {
    const onesAndFives = checkForOnesAndFives(roll)
    rollResult.score = onesAndFives
    rollResult.success = rollResult.score > 0 ? true : false
  }
};
const fiveDieRoll = (roll, rollResult, scoringDice) => {
  rollResult.roll = roll
  // Checks for three of a kind or four of a kind
  for (const x of roll) {
    let likeDice = roll.filter(y => y === x)
    const unlikeDice = roll.filter(i => i !== likeDice[0])
    if (likeDice.length === 3) {
      const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
      scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
      const onesAndFives = checkForOnesAndFives(unlikeDice)

      rollResult.tripleExists = true
      rollResult.score = tripleScore + onesAndFives
      rollResult.success = true
      return
    }
    if (likeDice.length === 4) {
      const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
      scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
      const onesAndFives = checkForOnesAndFives(unlikeDice)

      rollResult.quadExists = true
      rollResult.score = quadScore + onesAndFives
      rollResult.success = true
      return
    }
  }
  // Checks for five of a kind
  if (roll.every(x => x === roll[0])) {
    const quintScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2 * 2
    scoringDice.push({type: `${roll[0]}s`, score: quintScore, dice: 5})

    rollResult.quintExists = true
    rollResult.score = quintScore
    rollResult.success = true
  } else {
    const onesAndFives = checkForOnesAndFives(roll)
    rollResult.score = onesAndFives
    rollResult.success = rollResult.score > 0 ? true : false
  }
};
const sixDieRoll = (roll, rollResult, scoringDice) => {
  rollResult.roll = roll
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
      rollResult.tripleExists = true
      tripleCount++
      if (!tripleValues.includes(likeDice[0])) {
        tripleValues.push(likeDice[0])
      }
    }
    if (likeDice.length === 4) {
      const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
      scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
      const onesAndFives = checkForOnesAndFives(unlikeDice)

      rollResult.quadExists = true
      rollResult.score = quadScore + onesAndFives
      rollResult.success = true
      return
    }
    if (likeDice.length === 5) {
      const quintScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2 * 2
      scoringDice.push({type: `${likeDice[0]}s`, score: quintScore, dice: 5})
      const onesAndFives = checkForOnesAndFives(unlikeDice)

      rollResult.quadExists = true
      rollResult.score = quintScore + onesAndFives
      rollResult.success = true
      return
    }
  }
  // Checks for a straight
  if (roll.includes(1) && roll.includes(2) && roll.includes(3) && roll.includes(4) && roll.includes(5) && roll.includes(6)) {
    scoringDice.push({type: `Straight`, score: 1500, dice: 6})
    rollResult.straight = true
    rollResult.score = 1500
    rollResult.success = true
  } else if (roll.every(x => x === roll[0])) {
    // Checks for six of a kind
    scoringDice.push({type: `SIX of a KIND`, score: 10000, dice: 6})
    rollResult.sextExists = true
    rollResult.score = 10000
    rollResult.success = true
  } else if (doubleCount === 6) {
    // Checks for three pairs
    scoringDice.push({type: `Three Pair`, score: 1000, dice: 6})
    rollResult.threePairs = true
    rollResult.score = 1000
    rollResult.success = true
  } else if (tripleCount === 6) {
    // Checks for two three of a kinds
    let tripleScoreA = tripleValues[0] === 1 ? tripleValues[0] * 1000 : tripleValues[0] * 100
    let tripleScoreB = tripleValues[1] === 1 ? tripleValues[1] * 1000 : tripleValues[1] * 100
    scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScoreA, dice: 3})
    scoringDice.push({type: `${tripleValues[1]}s`, score: tripleScoreB, dice: 3})
    rollResult.score = tripleScoreA + tripleScoreB
    rollResult.success = true
  } else if (tripleCount === 3) {
    // checks for one three of a kind
    const tripleScore = tripleValues[0] * (tripleValues[0] === 1 ? 1000 : 100)
    const unlikeDice = roll.filter(i => i !== tripleValues[0])
    scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScore, dice: 3})
    const onesAndFives = checkForOnesAndFives(unlikeDice)
    rollResult.tripleExists = true
    rollResult.score = tripleScore + onesAndFives
    rollResult.success = true
  } else {
    const onesAndFives = checkForOnesAndFives(roll)
    rollResult.score = onesAndFives
    rollResult.success = rollResult.score > 0 ? true : false
  }
}

export default {
  main(rollResult, scoringDice) {
    const dieNumbers = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]

    if (rollResult.dice === 1) oneDieRoll(dieNumbers.slice(0,1), rollResult, scoringDice)
    if (rollResult.dice === 2) twoDieRoll(dieNumbers.slice(0,2), rollResult, scoringDice)
    if (rollResult.dice === 3) threeDieRoll(dieNumbers.slice(0,3), rollResult, scoringDice)
    if (rollResult.dice === 4) fourDieRoll(dieNumbers.slice(0,4), rollResult, scoringDice)
    if (rollResult.dice === 5) fiveDieRoll(dieNumbers.slice(0,5), rollResult, scoringDice)
    if (rollResult.dice === 6) sixDieRoll(dieNumbers, rollResult, scoringDice)

    return [rollResult, scoringDice]
  },
  // oneDieRoll(roll) {
  //   rollResult.roll = roll
  //   const onesAndFives = checkForOnesAndFives(roll)
  //   rollResult.score = onesAndFives
  //   rollResult.success = rollResult.score > 0 ? true : false
  // },
  // twoDieRoll(roll) {
  //   rollResult.roll = roll
  //   const onesAndFives = checkForOnesAndFives(roll)
  //   rollResult.score = onesAndFives
  //   rollResult.success = rollResult.score > 0 ? true : false
  // },
  // threeDieRoll(roll) {
  //   rollResult.roll = roll
  //   // Check for three of a kind
  //   if (roll[0] === roll[1] && roll[1] === roll[2]) {
  //     const tripleScore = roll[0] * (roll[0] === 1 ? 1000 : 100)
  //     scoringDice.push({type: `${roll[0]}s`, score: tripleScore, dice: 3})

  //     rollResult.tripleExists = true
  //     rollResult.score = tripleScore
  //     rollResult.success = true
  //   } else {
  //     const onesAndFives = checkForOnesAndFives(roll)
  //     rollResult.score = onesAndFives
  //     rollResult.success = rollResult.score > 0 ? true : false
  //   }
  // },
  // fourDieRoll(roll) {
  //   rollResult.roll = roll
  //   // Check for three of a kind
  //   for (const x of roll) {
  //     let likeDice = roll.filter(y => y === x)
  //     if (likeDice.length === 3) {
  //       const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
  //       scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
  //       const unlikeDice = roll.filter(i => i !== likeDice[0])
  //       const onesAndFives = checkForOnesAndFives(unlikeDice)

  //       rollResult.tripleExists = true
  //       rollResult.score = tripleScore + onesAndFives
  //       rollResult.success = true
  //       return
  //     }
  //   }
  //   // Check for four of a kind
  //   if (roll.every(x => x === roll[0])) {
  //     const quadScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2
  //     scoringDice.push({type: `${roll[0]}s`, score: quadScore, dice: 4})

  //     rollResult.quadExists = true
  //     rollResult.score = quadScore
  //     rollResult.success = true
  //   } else {
  //     const onesAndFives = checkForOnesAndFives(roll)
  //     rollResult.score = onesAndFives
  //     rollResult.success = rollResult.score > 0 ? true : false
  //   }
  // },
  // fiveDieRoll(roll) {
  //   rollResult.roll = roll
  //   // Checks for three of a kind or four of a kind
  //   for (const x of roll) {
  //     let likeDice = roll.filter(y => y === x)
  //     const unlikeDice = roll.filter(i => i !== likeDice[0])
  //     if (likeDice.length === 3) {
  //       const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
  //       scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
  //       const onesAndFives = checkForOnesAndFives(unlikeDice)

  //       rollResult.tripleExists = true
  //       rollResult.score = tripleScore + onesAndFives
  //       rollResult.success = true
  //       return
  //     }
  //     if (likeDice.length === 4) {
  //       const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
  //       scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
  //       const onesAndFives = checkForOnesAndFives(unlikeDice)

  //       rollResult.quadExists = true
  //       rollResult.score = quadScore + onesAndFives
  //       rollResult.success = true
  //       return
  //     }
  //   }
  //   // Checks for five of a kind
  //   if (roll.every(x => x === roll[0])) {
  //     const quintScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2 * 2
  //     scoringDice.push({type: `${roll[0]}s`, score: quintScore, dice: 5})

  //     rollResult.quintExists = true
  //     rollResult.score = quintScore
  //     rollResult.success = true
  //   } else {
  //     const onesAndFives = checkForOnesAndFives(roll)
  //     rollResult.score = onesAndFives
  //     rollResult.success = rollResult.score > 0 ? true : false
  //   }
  // },
  // sixDieRoll(roll) {
  //   rollResult.roll = roll
  //   let doubleCount = 0
  //   let tripleCount = 0
  //   let tripleValues = []
  //   // Check for two, three, four, or five of a kind
  //   for (const x of roll) {
  //     let likeDice = roll.filter(y => y === x)
  //     const unlikeDice = roll.filter(i => i !== likeDice[0])
  //     if (likeDice.length === 2) {
  //       doubleCount++
  //     }
  //     if (likeDice.length === 3) {
  //       rollResult.tripleExists = true
  //       tripleCount++
  //       if (!tripleValues.includes(likeDice[0])) {
  //         tripleValues.push(likeDice[0])
  //       }
  //     }
  //     if (likeDice.length === 4) {
  //       const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
  //       scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
  //       const onesAndFives = checkForOnesAndFives(unlikeDice)

  //       rollResult.quadExists = true
  //       rollResult.score = quadScore + onesAndFives
  //       rollResult.success = true
  //       return
  //     }
  //     if (likeDice.length === 5) {
  //       const quintScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2 * 2
  //       scoringDice.push({type: `${likeDice[0]}s`, score: quintScore, dice: 5})
  //       const onesAndFives = checkForOnesAndFives(unlikeDice)

  //       rollResult.quadExists = true
  //       rollResult.score = quintScore + onesAndFives
  //       rollResult.success = true
  //       return
  //     }
  //   }
  //   // Checks for a straight
  //   if (roll.includes(1) && roll.includes(2) && roll.includes(3) && roll.includes(4) && roll.includes(5) && roll.includes(6)) {
  //     scoringDice.push({type: `Straight`, score: 1500, dice: 6})
  //     rollResult.straight = true
  //     rollResult.score = 1500
  //     rollResult.success = true
  //   } else if (roll.every(x => x === roll[0])) {
  //     // Checks for six of a kind
  //     scoringDice.push({type: `SIX of a KIND`, score: 10000, dice: 6})
  //     rollResult.sextExists = true
  //     rollResult.score = 10000
  //     rollResult.success = true
  //   } else if (doubleCount === 6) {
  //     // Checks for three pairs
  //     scoringDice.push({type: `Three Pair`, score: 1000, dice: 6})
  //     rollResult.threePairs = true
  //     rollResult.score = 1000
  //     rollResult.success = true
  //   } else if (tripleCount === 6) {
  //     // Checks for two three of a kinds
  //     let tripleScoreA = tripleValues[0] === 1 ? tripleValues[0] * 1000 : tripleValues[0] * 100
  //     let tripleScoreB = tripleValues[1] === 1 ? tripleValues[1] * 1000 : tripleValues[1] * 100
  //     scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScoreA, dice: 3})
  //     scoringDice.push({type: `${tripleValues[1]}s`, score: tripleScoreB, dice: 3})
  //     rollResult.score = tripleScoreA + tripleScoreB
  //     rollResult.success = true
  //   } else if (tripleCount === 3) {
  //     // checks for one three of a kind
  //     const tripleScore = tripleValues[0] * (tripleValues[0] === 1 ? 1000 : 100)
  //     const unlikeDice = roll.filter(i => i !== tripleValues[0])
  //     scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScore, dice: 3})
  //     const onesAndFives = checkForOnesAndFives(unlikeDice)
  //     rollResult.tripleExists = true
  //     rollResult.score = tripleScore + onesAndFives
  //     rollResult.success = true
  //   } else {
  //     const onesAndFives = checkForOnesAndFives(roll)
  //     rollResult.score = onesAndFives
  //     rollResult.success = rollResult.score > 0 ? true : false
  //   }
  // }
}