import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/supabase"
import { Stethoscope, User, ImageIcon, AlertCircle } from "lucide-react"

interface ConversationItem {
  id: number
  type: 'assistant' | 'user' | 'image' | 'error'
  content: string
  imageUrl?: string
  imageDescription?: string
}

interface QuestionState {
  isWaiting: boolean
  type: 'curative' | 'surgery' | null
  correctAnswer: number
}

export default function PBLCase() {
  const [conversationItems, setConversationItems] = useState<ConversationItem[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [questionState, setQuestionState] = useState<QuestionState>({
    isWaiting: false,
    type: null,
    correctAnswer: 0
  })

  const addConversationItem = (item: Omit<ConversationItem, 'id'>) => {
    setConversationItems(prev => [
      ...prev,
      { ...item, id: Date.now() + Math.random() }
    ])
  }

  const addImage = (fileName: string, description: string) => {
    const imageUrl = getImageUrl('pbl04', fileName)
    addConversationItem({
      type: 'image',
      content: fileName,
      imageUrl,
      imageDescription: description
    })
  }

  const autoScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }, 100)
  }

  const proceedToStep = (step: number) => {
    switch (step) {
      case 1:
        addConversationItem({
          type: 'assistant',
          content: `환자에 대해 설명드리겠습니다.

1. 환자는 고혈압 약제를 복용하면서 큰 문제 없이 지내오던 75세의 남자입니다.
2. 얼마 전 검진 내시경에서 발견된 2-3 cm MB GC adenocarcinoma로 본원을 내원하였습니다.

선생님은 외래에서 EGD와 복부 CT를 의뢰하였습니다. 복부 CT는 정상 소견이었습니다. 그럼 EGD image를 보시겠습니까?`
        })
        break

      case 2:
        addImage('EGD.png', '1. EGD image')
        setTimeout(() => {
          addConversationItem({
            type: 'assistant',
            content: `내시경 조직생검의 결과는 adenocarcinoma M/D 였습니다.

우선 환자에게 내시경으로 절제된 결과에 따라서는 수술적 절제를 추가로 할 수 있다는 설명을 했고, 환자는 내시경적 절제를 원하여서, ESD를 시행하였습니다. ESD image와 ESD pathology report image를 보시겠습니까?`
          })
        }, 500)
        break

      case 3:
        addImage('ESD.png', '1. EGD image')
        addImage('ESD pathology report.png', '2. Biopsy report image')
        setTimeout(() => {
          addConversationItem({
            type: 'assistant',
            content: '이 병리 결과로 보면 curative resection일까요? non-curative resection일까요?'
          })
          setQuestionState({
            isWaiting: true,
            type: 'curative',
            correctAnswer: 2
          })
        }, 1000)
        break

      case 4:
        addConversationItem({
          type: 'assistant',
          content: `예, 맞습니다. PD 인 경우엔 curative resection의 Expanded indication은 En bloc resection, LVI -, HRM-, VRM -, 점막 국한, ulcer -, and 2 cm 이하입니다. 그러나 이 경우는 PD 2.5 cm, sm 1500 um invasion이므로 non curative resection입니다.

이런 경우 재발율에 대해서는 확실하게 정해진 수치는 없지만 20 - 30% 정도 재발율을 보인다고 얘기하는 것이 무난합니다. 즉 수술을 추가로 해야 안전합니다. 환자에게 잘 설명해서 추가 수술을 시행하였습니다.

그런데 수술 후 병리 검사의 결과 no residual cancer, no LN metastasis 였습니다. 환자는 어디서 조언을 구했는지, 안해도 되는 수술을 했다며 선생님에게 해명을 요구합니다.

이 환자는 그럼 수술을 하지 않았어도 되나요?`
        })
        setQuestionState({
          isWaiting: true,
          type: 'surgery',
          correctAnswer: 2
        })
        break

      case 5:
        addConversationItem({
          type: 'assistant',
          content: `예, 맞습니다.

1. 놀랍게도, 일부 외과 선생님과 심지어는 소화기 내시경 전문가도 그렇게 얘기하는 경우가 있습니다. 이는 전적으로 틀린 말입니다.
2. 우리가 complete resection을 했음에도, 재발 위험이 20% 있다고 할 때는 현재 수술 후 병리검사에서 발견 가능한 크기의 LN 전이가 20%라는 의미가 아닙니다.
3. 수술 당시에는 병리 검사에서는 찾아낼 수 없는 micrometastasis가 20% 의 확률로 존재해서 1-3년 사이에 CT에서 발견할 수 있을 만큼 커진다는 의미입니다.
4. 이는 병리 검사에서 Sentinel LN가 아닌 일반 node는 가장 직경이 큰 면으로 one plane만 절재해서 검사하는 방식을 생각해 보면 당연한 얘기입니다. 즉 병리 검사 당시 LN meta가 없다고 cancer cell이 없다고 하는 것은 아주 위험한 생각입니다.
5. 따라서 환자에게 이를 잘 설명해 주어야 합니다. '현재 관찰할 수 있을 만큼 큰 전이가 없어도 20%의 확률로 작은 암세포가 숨어 있기 때문에, 수술은 꼭 필요한 치료 였습니다.'라고요.
6. 참고로 병리에서 PD를 진단하는 기준은 분화도가 좋은 portion이 검사 전체에서 50% 안되는 경우에 PD를 줍니다. 병리 report에는 PD %로 기록하는데, 이건 소화기 의사의 요구로 그렇게 쓰는 것이고, 병리 의사는 PD 55%와 75% 사이에 양적인 차이를 의미있다고 봐서 그렇게 적는 것이 아닙니다. 오해 없기를 바랍니다.

그럼 과제를 드리겠습니다. EGC ESD에서 curative resection의 absolute indication과 expanded indication을 정리하여, PBL_amc_F2_04_이름.docx 파일을 교수님에게 제출하시기 바랍니다.

수고하셨습니다.`
        })
        setQuestionState({
          isWaiting: false,
          type: null,
          correctAnswer: 0
        })
        break
    }
    setCurrentStep(step)
  }

  const handleAnswer = (choice: number, answerText: string) => {
    if (!questionState.isWaiting) return

    addConversationItem({
      type: 'user',
      content: answerText
    })

    setTimeout(() => {
      if (choice === questionState.correctAnswer) {
        setQuestionState(prev => ({ ...prev, isWaiting: false }))
        proceedToStep(currentStep + 1)
      } else {
        addConversationItem({
          type: 'error',
          content: '기대한 대답이 아닙니다. 다시 생각해보고 대답해 주세요.'
        })
        // Keep waiting for correct answer
      }
    }, 500)
  }

  useEffect(() => {
    // Initialize with first message
    addConversationItem({
      type: 'assistant',
      content: '로딩이 완료 되었습니다. 환자에 대해 말씀 드릴까요?'
    })
  }, [])

  useEffect(() => {
    autoScroll()
  }, [conversationItems])

  const renderConversationItem = (item: ConversationItem) => {
    const baseClasses = "fade-in mb-4"
    
    switch (item.type) {
      case 'assistant':
        return (
          <div key={item.id} className={baseClasses}>
            <Card className="light-blue-bg border-l-4 border-blue-600">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Stethoscope className="text-blue-600 mt-1 flex-shrink-0 h-5 w-5" />
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'user':
        return (
          <div key={item.id} className={`${baseClasses} ml-8`}>
            <Card className="bg-gray-200 border-l-4 border-gray-400">
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <User className="text-gray-600 mt-1 flex-shrink-0 h-5 w-5" />
                  <div className="text-gray-800">
                    {item.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'image':
        return (
          <div key={item.id} className={baseClasses}>
            <Card className="bg-white border">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-2">{item.imageDescription}</p>
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.content}
                    className="max-w-full h-auto rounded border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div class="text-gray-400 text-4xl mb-2">🖼️</div>
                            <p class="text-gray-500">이미지 로딩 중: ${item.content}</p>
                            <p class="text-xs text-gray-400 mt-1">Supabase Storage: pbl04/${item.content}</p>
                          </div>
                        `
                      }
                    }}
                  />
                ) : (
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="text-gray-400 h-12 w-12 mx-auto mb-2" />
                    <p className="text-gray-500">이미지 로딩 중: {item.content}</p>
                    <p className="text-xs text-gray-400 mt-1">Supabase Storage: pbl04/{item.content}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case 'error':
        return (
          <div key={item.id} className={baseClasses}>
            <Card className="bg-red-50 border-l-4 border-red-400">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-red-500 mt-1 flex-shrink-0 h-5 w-5" />
                  <div className="text-red-800">
                    {item.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const renderActionButtons = () => {
    if (questionState.isWaiting) {
      if (questionState.type === 'curative') {
        return (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <Button 
              variant="light-peach"
              onClick={() => handleAnswer(1, 'curative resection')}
              className="font-medium px-6 whitespace-nowrap"
            >
              1. curative resection
            </Button>
            <Button 
              variant="light-peach"
              onClick={() => handleAnswer(2, 'non-curative resection')}
              className="font-medium px-6 whitespace-nowrap"
            >
              2. non-curative resection
            </Button>
          </div>
        )
      } else if (questionState.type === 'surgery') {
        return (
          <div className="flex flex-col gap-2 mt-4 items-center">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="light-peach"
                onClick={() => handleAnswer(1, '수술을 하지 않았어도 되는 환자인데 운이 없었다.')}
                className="font-medium px-4 whitespace-nowrap max-w-sm"
              >
                1. 수술을 하지 않았어도 되는 환자인데 운이 없었다.
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="light-peach"
                onClick={() => handleAnswer(2, '아니다 수술을 해야 한다.')}
                className="font-medium px-6 whitespace-nowrap"
              >
                2. 아니다 수술을 해야 한다.
              </Button>
            </div>
          </div>
        )
      }
    } else if (currentStep === 0) {
      return (
        <div className="flex justify-center mt-4">
          <Button 
            variant="light-orange"
            onClick={() => proceedToStep(1)}
            className="font-medium px-8 whitespace-nowrap"
          >
            예
          </Button>
        </div>
      )
    } else if (currentStep === 1) {
      return (
        <div className="flex justify-center mt-4">
          <Button 
            variant="light-orange"
            onClick={() => proceedToStep(2)}
            className="font-medium px-8 whitespace-nowrap"
          >
            예
          </Button>
        </div>
      )
    } else if (currentStep === 2) {
      return (
        <div className="flex justify-center mt-4">
          <Button 
            variant="light-orange"
            onClick={() => proceedToStep(3)}
            className="font-medium px-8 whitespace-nowrap"
          >
            예
          </Button>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="material-blue text-white p-4 shadow-md">
        <h1 className="text-lg font-medium text-center">
          AMC GI 상부 F2용 PBL 04
          <br />
          <span className="text-sm font-normal">non curative ESD 후 수술하고 나온 병리 결과</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 pb-20">
        <div className="space-y-4">
          {conversationItems.map(renderConversationItem)}
          {renderActionButtons()}
        </div>
      </div>

      {/* Fixed Bottom Padding */}
      <div className="h-20"></div>
    </div>
  )
}
