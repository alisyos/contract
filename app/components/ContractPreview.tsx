'use client'

import { useState } from 'react'
import { ContractData } from '../types/contract'

interface ContractPreviewProps {
  data: ContractData
}

export default function ContractPreview({ data }: ContractPreviewProps) {
  const [zoom, setZoom] = useState(100)
  const [isEditing, setIsEditing] = useState(false)
  const [editableContent, setEditableContent] = useState('')

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoom < 150) {
      setZoom(zoom + 10)
    } else if (direction === 'out' && zoom > 50) {
      setZoom(zoom - 10)
    }
  }

  const handleEdit = () => {
    if (!isEditing) {
      setEditableContent(data.generatedContract)
    }
    setIsEditing(!isEditing)
  }

  const handleSaveEdit = () => {
    // TODO: 편집된 내용을 상위 컴포넌트로 전달
    setIsEditing(false)
  }

  const downloadPDF = async () => {
    // TODO: PDF 다운로드 기능 구현
    console.log('PDF 다운로드')
  }

  const downloadWord = async () => {
    // TODO: Word 다운로드 기능 구현
    console.log('Word 다운로드')
  }

  const renderPreviewContent = () => {
    if (!data.generatedContract) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500">
          <div className="text-6xl mb-4">📄</div>
          <div className="text-lg font-medium mb-2">계약서 미리보기</div>
          <div className="text-sm text-center">
            좌측에서 정보를 입력하고 '계약서 생성하기' 버튼을 클릭하면<br />
            AI가 생성한 계약서를 여기서 확인할 수 있습니다.
          </div>
        </div>
      )
    }

    return (
      <div 
        className="bg-white p-8 shadow-inner border border-gray-200 rounded"
        style={{ fontSize: `${zoom}%` }}
      >
        {isEditing ? (
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            className="w-full h-full min-h-96 border-none resize-none focus:outline-none"
            style={{ fontSize: 'inherit' }}
          />
        ) : (
          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {data.generatedContract}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 도구 모음 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleZoom('out')}
            className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded"
            disabled={zoom <= 50}
          >
            <span>🔍-</span>
          </button>
          <span className="text-sm text-gray-600 px-2">{zoom}%</span>
          <button
            onClick={() => handleZoom('in')}
            className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded"
            disabled={zoom >= 150}
          >
            <span>🔍+</span>
          </button>
        </div>

        {data.generatedContract && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded"
            >
              <span>✏️</span>
              <span>{isEditing ? '완료' : '편집'}</span>
            </button>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                <span>💾</span>
                <span>다운로드</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={downloadPDF}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  PDF 다운로드
                </button>
                <button
                  onClick={downloadWord}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Word 다운로드
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 미리보기 영역 */}
      <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 max-h-96 overflow-auto">
        {renderPreviewContent()}
      </div>

      {isEditing && data.generatedContract && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="btn-secondary"
          >
            취소
          </button>
          <button
            onClick={handleSaveEdit}
            className="btn-primary"
          >
            저장
          </button>
        </div>
      )}
    </div>
  )
} 