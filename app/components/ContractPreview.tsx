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
      // 동적 import로 jsPDF 로드
      const { jsPDF } = await import('jspdf')
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // 계약서 내용 가져오기
      const content = isEditing ? editableContent : data.generatedContract
      
      // 한글을 지원하는 방식으로 텍스트 처리
      const lines = content.split('\n')
      let yPosition = 20
      const lineHeight = 7
      const pageHeight = 280
      const margin = 20
      const maxWidth = 170

      // 각 줄을 PDF에 추가
      for (const line of lines) {
        // 페이지 높이를 초과하면 새 페이지 추가
        if (yPosition > pageHeight - margin) {
          doc.addPage()
          yPosition = 20
        }

        if (line.trim() === '') {
          // 빈 줄 처리
          yPosition += lineHeight
          continue
        }

        // 긴 줄을 여러 줄로 분할 (한글 지원)
        const words = line.split(' ')
        let currentLine = ''
        
        for (const word of words) {
          const testLine = currentLine + (currentLine ? ' ' : '') + word
          const textWidth = doc.getTextWidth(testLine)
          
          if (textWidth > maxWidth && currentLine) {
            // 현재 줄 출력
            if (yPosition > pageHeight - margin) {
              doc.addPage()
              yPosition = 20
            }
            doc.text(currentLine, margin, yPosition)
            yPosition += lineHeight
            currentLine = word
          } else {
            currentLine = testLine
          }
        }
        
        // 마지막 줄 출력
        if (currentLine) {
          if (yPosition > pageHeight - margin) {
            doc.addPage()
            yPosition = 20
          }
          doc.text(currentLine, margin, yPosition)
          yPosition += lineHeight
        }
      }

      // 파일명 생성
      const contractType = data.contractType || '계약서'
      const fileName = `${contractType}_${new Date().toISOString().split('T')[0]}.pdf`
      
      // PDF 다운로드
      doc.save(fileName)
    } catch (error) {
      console.error('PDF 다운로드 실패:', error)
      alert('PDF 다운로드에 실패했습니다. 브라우저에서 팝업 차단을 해제해주세요.')
    }
  }

  const downloadWord = async () => {
    try {
      // 동적 import로 docx와 file-saver 로드
      const docxModule = await import('docx')
      const fileSaverModule = await import('file-saver')
      
      const { Document, Packer, Paragraph, TextRun } = docxModule
      const { saveAs } = fileSaverModule

      // 계약서 내용 가져오기
      const content = isEditing ? editableContent : data.generatedContract
      
      // 텍스트를 줄 단위로 분할하여 Paragraph 생성
      const lines = content.split('\n')
      const paragraphs = lines.map(line => 
        new Paragraph({
          children: [
            new TextRun({
              text: line || ' ', // 빈 줄도 처리
              font: {
                name: 'Malgun Gothic' // 한글 폰트
              },
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
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Word 다운로드 실패:', error)
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류'
      alert(`Word 다운로드에 실패했습니다. 오류: ${errorMessage}`)
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