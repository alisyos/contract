'use client'

import { useState } from 'react'
import { ContractData } from '../types/contract'

interface ContractPreviewProps {
  data: ContractData
}

export default function ContractPreview({ data }: ContractPreviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editableContent, setEditableContent] = useState('')

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
    try {
      // 계약서 내용 가져오기
      const content = isEditing ? editableContent : data.generatedContract
      
      // 새 창에서 인쇄 가능한 HTML 생성
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        alert('팝업 차단이 설정되어 있습니다. 팝업 차단을 해제해주세요.')
        return
      }

      const contractType = data.contractType || '계약서'
      const fileName = `${contractType}_${new Date().toISOString().split('T')[0]}`

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${fileName}</title>
          <style>
            body {
              font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
              line-height: 1.6;
              padding: 20px;
              margin: 0;
              font-size: 12pt;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-family: inherit;
              margin: 0;
            }
            @media print {
              body { margin: 0; padding: 15mm; }
            }
          </style>
        </head>
        <body>
          <pre>${content}</pre>
        </body>
        </html>
      `)
      
      printWindow.document.close()
      
      // 문서 로드 완료 후 인쇄 대화상자 열기
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
        }, 250)
      }
    } catch (error) {
      console.error('PDF 다운로드 실패:', error)
      alert('PDF 다운로드에 실패했습니다. 브라우저에서 팝업 차단을 해제해주세요.')
    }
  }

  const downloadWord = async () => {
    try {
      // 동적 import로 docx 로드
      const { Document, Packer, Paragraph, TextRun } = await import('docx')
      
      // 계약서 내용 가져오기
      const content = isEditing ? editableContent : data.generatedContract
      
      // 텍스트를 줄 단위로 분할하여 Paragraph 생성
      const lines = content.split('\n')
      const paragraphs = lines.map(line => 
        new Paragraph({
          children: [
            new TextRun({
              text: line || ' ', // 빈 줄도 처리
              font: 'Malgun Gothic', // 한글 폰트를 문자열로 직접 지정
              size: 22 // 11pt (half-points)
            })
          ],
          spacing: {
            after: 120 // 줄 간격
          }
        })
      )

      // Word 문서 생성
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch in twips
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: paragraphs
        }]
      })

      // 파일명 생성
      const contractType = data.contractType || '계약서'
      const fileName = `${contractType}_${new Date().toISOString().split('T')[0]}.docx`

      // Word 문서를 Blob으로 변환하여 다운로드
      const blob = await Packer.toBlob(doc)
      
      // 다운로드 링크 생성 및 클릭
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Word 다운로드 실패:', error)
      
      // docx 실패 시 텍스트 파일로 대체
      try {
        const content = isEditing ? editableContent : data.generatedContract
        const blob = new Blob(['\ufeff' + content], { 
          type: 'text/plain;charset=utf-8' 
        })
        
        const contractType = data.contractType || '계약서'
        const fileName = `${contractType}_${new Date().toISOString().split('T')[0]}.txt`
        
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        alert('Word 파일 생성에 실패하여 텍스트 파일로 다운로드됩니다.')
      } catch (fallbackError) {
        console.error('텍스트 다운로드도 실패:', fallbackError)
        alert('파일 다운로드에 실패했습니다.')
      }
    }
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
      {data.generatedContract && (
        <div className="flex items-center justify-end">
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
        </div>
      )}

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