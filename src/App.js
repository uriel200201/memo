import { useState, useEffect } from 'react'
import './App.css'
import Board from './Components/Board/Board'
const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖']

function App() {
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([])
	const [selectedMemoBlock, setSelectedMemoBlock] = useState(null)
	const [animating, setAnimating] = useState(false)

	useEffect(() => {
		const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList])
		setShuffledMemoBlocks(
			shuffledEmojiList.map((emoji, i) => ({
				index: i,
				emoji,
				flipped: false,
			}))
		)
	}, [])

	const shuffleArray = (a) => {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
		}
		return a
	}

	const handleMemoClick = (memoBlock) => {
		const flippedMemoBlock = { ...memoBlock, flipped: true }
		let shuffledMemoBlocksCopy = [...shuffledMemoBlocks]
		shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock)
		setShuffledMemoBlocks(shuffledMemoBlocksCopy)
		if (selectedMemoBlock === null) {
			setSelectedMemoBlock(memoBlock)
		} else if (selectedMemoBlock.emoji === memoBlock.emoji) {
			setSelectedMemoBlock(null)
		} else {
			setAnimating(true)
			setTimeout(() => {
				shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock)
				shuffledMemoBlocksCopy.splice(
					selectedMemoBlock.index,
					1,
					selectedMemoBlock
				)
				setShuffledMemoBlocks(shuffledMemoBlocksCopy)
				setSelectedMemoBlock(null)
				setAnimating(false)
			}, 1000)
		}
	}

	return (
		<Board
			memoBlocks={shuffledMemoBlocks}
			animating={animating}
			handleMemoClick={handleMemoClick}
		/>
	)
}

export default App
