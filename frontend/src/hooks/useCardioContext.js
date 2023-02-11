import { useContext } from 'react'
import { CardioContext } from '../context/CardioContext'

export const useCardioContext = () => {
  const context = useContext(CardioContext)

  if (!context) {
    throw Error('useCardioContext must be used inside an CardioContextProvider')
  }

  return context
}