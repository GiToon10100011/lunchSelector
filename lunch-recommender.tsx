"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Plus, Shuffle, Check, History, Settings, Edit } from "lucide-react"

interface MealRecord {
  id: string
  menu: string
  date: string
}

const initialMenus = [
  "타코",
  "샌드위치",
  "고등어구이",
  "김치찌개",
  "쌀국수",
  "라멘",
  "평냉",
  "스시",
  "장어덮밥",
  "국밥",
  "쉑쉑",
  "솥밥",
]

export default function LunchRecommender() {
  const [menus, setMenus] = useState<string[]>(initialMenus)
  const [currentRecommendation, setCurrentRecommendation] = useState<string>("")
  const [newMenu, setNewMenu] = useState("")
  const [mealHistory, setMealHistory] = useState<MealRecord[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [showManageDialog, setShowManageDialog] = useState(false)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [editingRecord, setEditingRecord] = useState<MealRecord | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editMenu, setEditMenu] = useState("")
  const [editDate, setEditDate] = useState("")

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedMenus = localStorage.getItem("lunch-menus")
    const savedHistory = localStorage.getItem("meal-history")

    if (savedMenus) {
      setMenus(JSON.parse(savedMenus))
    }
    if (savedHistory) {
      setMealHistory(JSON.parse(savedHistory))
    }
  }, [])

  // 데이터 저장
  useEffect(() => {
    localStorage.setItem("lunch-menus", JSON.stringify(menus))
  }, [menus])

  useEffect(() => {
    localStorage.setItem("meal-history", JSON.stringify(mealHistory))
  }, [mealHistory])

  const getRandomMenu = () => {
    if (menus.length === 0) return ""
    const randomIndex = Math.floor(Math.random() * menus.length)
    return menus[randomIndex]
  }

  const handleRecommend = () => {
    if (menus.length === 0) {
      alert("추천할 메뉴가 없습니다. 메뉴를 추가해주세요!")
      return
    }

    setIsSpinning(true)

    // 스피닝 애니메이션 효과
    let spinCount = 0
    const spinInterval = setInterval(() => {
      setCurrentRecommendation(getRandomMenu())
      spinCount++

      if (spinCount >= 10) {
        clearInterval(spinInterval)
        setCurrentRecommendation(getRandomMenu())
        setIsSpinning(false)
      }
    }, 100)
  }

  const addMenu = () => {
    if (newMenu.trim() && !menus.includes(newMenu.trim())) {
      setMenus([...menus, newMenu.trim()])
      setNewMenu("")
    }
  }

  const removeMenu = (menuToRemove: string) => {
    setMenus(menus.filter((menu) => menu !== menuToRemove))
  }

  const confirmSelection = () => {
    if (currentRecommendation) {
      const newRecord: MealRecord = {
        id: Date.now().toString(),
        menu: currentRecommendation,
        date: new Date().toLocaleDateString("ko-KR"),
      }
      setMealHistory([newRecord, ...mealHistory])
      setShowConfirmDialog(false)
      setCurrentRecommendation("")
    }
  }

  const startEditRecord = (record: MealRecord) => {
    setEditingRecord(record)
    setEditMenu(record.menu)
    setEditDate(record.date)
    setShowEditDialog(true)
  }

  const saveEditRecord = () => {
    if (editingRecord && editMenu.trim()) {
      const updatedHistory = mealHistory.map((record) =>
        record.id === editingRecord.id ? { ...record, menu: editMenu.trim(), date: editDate } : record,
      )
      setMealHistory(updatedHistory)
      setShowEditDialog(false)
      setEditingRecord(null)
      setEditMenu("")
      setEditDate("")
    }
  }

  const deleteRecord = (recordId: string) => {
    setMealHistory(mealHistory.filter((record) => record.id !== recordId))
  }

  const cancelEdit = () => {
    setShowEditDialog(false)
    setEditingRecord(null)
    setEditMenu("")
    setEditDate("")
  }

  const getRecentMeals = () => {
    return mealHistory.slice(0, 5)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">🍽️ 점심메뉴 추천기</h1>
          <p className="text-gray-600">오늘 뭐 먹을지 고민될 때!</p>
        </div>

        {/* 메인 추천 카드 */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>오늘의 추천 메뉴</CardTitle>
            <CardDescription>버튼을 눌러 랜덤 메뉴를 추천받아보세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-20 flex items-center justify-center">
              {currentRecommendation ? (
                <div
                  className={`text-4xl font-bold text-orange-600 ${isSpinning ? "animate-pulse" : "animate-bounce"}`}
                >
                  {currentRecommendation}
                </div>
              ) : (
                <div className="text-2xl text-gray-400">?</div>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleRecommend} disabled={isSpinning} className="bg-orange-500 hover:bg-orange-600">
                <Shuffle className="w-4 h-4 mr-2" />
                {isSpinning ? "추천 중..." : "메뉴 추천"}
              </Button>

              {currentRecommendation && !isSpinning && (
                <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      선택 확정
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>메뉴 선택 확정</DialogTitle>
                      <DialogDescription>
                        <span className="font-semibold text-orange-600">{currentRecommendation}</span>을(를) 오늘 먹는
                        메뉴로 확정하시겠습니까?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                        취소
                      </Button>
                      <Button onClick={confirmSelection} className="bg-green-500 hover:bg-green-600">
                        확정
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 최근 기록 */}
        {mealHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">최근 먹은 메뉴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getRecentMeals().map((record) => (
                  <div
                    key={record.id}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg group"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{record.menu}</span>
                      <span className="text-sm text-gray-500 ml-2">{record.date}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditRecord(record)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRecord(record.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 액션 버튼들 */}
        <div className="flex gap-3 justify-center">
          <Dialog open={showManageDialog} onOpenChange={setShowManageDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                메뉴 관리
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>메뉴 관리</DialogTitle>
                <DialogDescription>메뉴를 추가하거나 제거할 수 있습니다</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* 메뉴 추가 */}
                <div className="flex gap-2">
                  <Input
                    placeholder="새 메뉴 입력"
                    value={newMenu}
                    onChange={(e) => setNewMenu(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addMenu()}
                  />
                  <Button onClick={addMenu} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Separator />

                {/* 현재 메뉴 목록 */}
                <div>
                  <h4 className="font-medium mb-2">현재 메뉴 ({menus.length}개)</h4>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {menus.map((menu, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>{menu}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMenu(menu)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <History className="w-4 h-4 mr-2" />
                전체 기록
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>식사 기록</DialogTitle>
                <DialogDescription>지금까지의 모든 식사 기록입니다</DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-64">
                {mealHistory.length > 0 ? (
                  <div className="space-y-2">
                    {mealHistory.map((record) => (
                      <div
                        key={record.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group"
                      >
                        <div className="flex-1">
                          <span className="font-medium">{record.menu}</span>
                          <span className="text-sm text-gray-500 ml-2">{record.date}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditRecord(record)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRecord(record.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">아직 기록이 없습니다</div>
                )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* 기록 편집 Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>기록 수정</DialogTitle>
              <DialogDescription>메뉴명과 날짜를 수정할 수 있습니다</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">메뉴명</label>
                <Input placeholder="메뉴명 입력" value={editMenu} onChange={(e) => setEditMenu(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">날짜</label>
                <Input
                  placeholder="날짜 입력 (예: 2024. 1. 15.)"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={cancelEdit}>
                취소
              </Button>
              <Button onClick={saveEditRecord} className="bg-blue-500 hover:bg-blue-600">
                저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 현재 메뉴 개수 표시 */}
        <div className="text-center">
          <Badge variant="secondary">총 {menus.length}개의 메뉴</Badge>
        </div>
      </div>
    </div>
  )
}
