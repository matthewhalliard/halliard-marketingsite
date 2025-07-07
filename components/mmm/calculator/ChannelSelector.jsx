import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

const channels = {
  audio: {
    name: 'Audio',
    channels: [
      { id: 'spotify', name: 'Spotify', icon: '🎵' },
      { id: 'pandora', name: 'Pandora', icon: '🎵' },
      { id: 'amazon_music', name: 'Amazon Music', icon: '🎵' },
      { id: 'other_streaming', name: 'Other Streaming Audio', icon: '🎶' },
      { id: 'am_radio', name: 'AM Radio', icon: '📻' },
      { id: 'fm_radio', name: 'FM Radio', icon: '📻' },
      { id: 'satellite_radio', name: 'Satellite Radio', icon: '📻' },
      { id: 'podcasts', name: 'Podcasts', icon: '🎙️' }
    ]
  },
  video: {
    name: 'Video',
    channels: [
      { id: 'netflix', name: 'Netflix', icon: '📺' },
      { id: 'hulu', name: 'Hulu', icon: '📺' },
      { id: 'prime_video', name: 'Amazon Prime Video', icon: '📺' },
      { id: 'max', name: 'Max', icon: '📺' },
      { id: 'disney_plus', name: 'Disney+', icon: '📺' },
      { id: 'paramount_plus', name: 'Paramount+', icon: '📺' },
      { id: 'peacock', name: 'Peacock', icon: '📺' },
      { id: 'pluto', name: 'Pluto', icon: '📺' },
      { id: 'tubi', name: 'Tubi', icon: '📺' },
      { id: 'early_morning_tv', name: 'Early Morning', icon: '📺' },
      { id: 'daytime_tv', name: 'Daytime', icon: '📺' },
      { id: 'early_fringe_tv', name: 'Early Fringe', icon: '📺' },
      { id: 'primetime_tv', name: 'Primetime', icon: '📺' },
      { id: 'late_fringe_tv', name: 'Late Fringe', icon: '📺' },
      { id: 'cable_tv', name: 'Cable', icon: '📺' },
      { id: 'movie_theater', name: 'Movie Theater', icon: '🍿' }
    ]
  },
  digital: {
    name: 'Digital',
    channels: [
      { id: 'facebook', name: 'Facebook', icon: '👤' },
      { id: 'instagram', name: 'Instagram', icon: '📷' },
      { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
      { id: 'snapchat', name: 'Snapchat', icon: '👻' },
      { id: 'tiktok', name: 'TikTok', icon: '🎵' },
      { id: 'pinterest', name: 'Pinterest', icon: '📌' },
      { id: 'youtube', name: 'YouTube', icon: '▶️' },
      { id: 'twitch', name: 'Twitch', icon: '🎮' },
      { id: 'other_online_video', name: 'Other Online Video', icon: '💻' },
      { id: 'digital_display', name: 'Digital Display', icon: '🖥️' },
      { id: 'paid_search', name: 'Paid Search', icon: '🔍' },
      { id: 'digital_retail', name: 'Digital Retail', icon: '🛒' },
      { id: 'video_games', name: 'Video Games', icon: '🎮' }
    ]
  },
  ooh: {
    name: 'Out of Home',
    channels: [
      { id: 'billboards', name: 'Billboards', icon: '🪧' },
      { id: 'transit', name: 'Transit', icon: '🚇' },
      { id: 'street_media', name: 'Street Media', icon: '🚶' },
      { id: 'airport', name: 'Airport', icon: '✈️' },
      { id: 'medical_facility', name: 'Medical Facility', icon: '🏥' },
      { id: 'gas_station', name: 'Gas Station', icon: '⛽' },
      { id: 'gym', name: 'Gym', icon: '🏋️' },
      { id: 'mall', name: 'Mall', icon: '🏬' },
      { id: 'sports_stadium', name: 'Sports Stadium', icon: '🏟️' }
    ]
  },
  print: {
    name: 'Print',
    channels: [
      { id: 'magazines', name: 'Magazines', icon: '📚' },
      { id: 'newspapers', name: 'Newspapers', icon: '📰' }
    ]
  }
}

export function ChannelSelector({ selected, onChange }) {
  const [expandedCategories, setExpandedCategories] = useState({
    audio: false,
    video: false,
    digital: true,
    ooh: false,
    print: false
  })

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const toggleChannel = (channelId) => {
    if (selected.includes(channelId)) {
      onChange(selected.filter(id => id !== channelId))
    } else {
      onChange([...selected, channelId])
    }
  }

  const selectAllInCategory = (category) => {
    const categoryChannels = channels[category].channels.map(c => c.id)
    const allSelected = categoryChannels.every(id => selected.includes(id))
    
    if (allSelected) {
      onChange(selected.filter(id => !categoryChannels.includes(id)))
    } else {
      const newSelected = [...selected]
      categoryChannels.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id)
        }
      })
      onChange(newSelected)
    }
  }

  return (
    <div className="space-y-4">
      {Object.entries(channels).map(([categoryKey, category]) => {
        const categoryChannels = category.channels
        const selectedInCategory = categoryChannels.filter(c => selected.includes(c.id)).length
        const allSelected = selectedInCategory === categoryChannels.length

        return (
          <div key={categoryKey} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleCategory(categoryKey)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
                <span className="text-sm text-gray-500">
                  ({selectedInCategory}/{categoryChannels.length} selected)
                </span>
              </div>
              {expandedCategories[categoryKey] ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedCategories[categoryKey] && (
              <div className="p-4">
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => selectAllInCategory(categoryKey)}
                    className="text-sm text-[#1F3FFF] hover:text-blue-700 font-medium"
                  >
                    {allSelected ? 'Deselect all' : 'Select all'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categoryChannels.map(channel => (
                    <label
                      key={channel.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-[#1F3FFF] focus:ring-[#1F3FFF] border-gray-300 rounded"
                        checked={selected.includes(channel.id)}
                        onChange={() => toggleChannel(channel.id)}
                      />
                      <span className="flex items-center space-x-1">
                        <span>{channel.icon}</span>
                        <span className="text-sm text-gray-700">{channel.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
      
      <div className="text-sm text-gray-500">
        Selected channels: {selected.length}
      </div>
    </div>
  )
} 