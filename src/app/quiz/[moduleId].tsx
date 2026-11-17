import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getModule } from '@/constants/learningContent';
import { questionsForModule } from '@/constants/quizContent';
import { useProgress } from '@/components/progress/ProgressProvider';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ActionButton } from '@/components/ui/ActionButton';
import { SourceReferenceList } from '@/components/learning/SourceReferenceList';
import type { QuizQuestion } from '@/types/learning';

type Stage = 'questions' | 'result' | 'review';

export default function QuizSessionScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const module = getModule(moduleId);
  const questions = useMemo(() => module ? questionsForModule(module.id) : [], [module]);
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { progress, ready, recordQuizResult } = useProgress();
  const [answers, setAnswers] = useState<(string | undefined)[]>(() => questions.map(() => undefined));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<Stage>('questions');
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  if (!module || questions.length === 0) {
    return <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}><Text style={{ color: colors.text }}>Este quiz não foi encontrado.</Text></SafeAreaView>;
  }

  const question = questions[currentIndex];
  const correctCount = questions.reduce((count, item, index) => count + (answers[index] === item.correctOptionId ? 1 : 0), 0);
  const selectedOption = answers[currentIndex];

  const finishQuiz = () => {
    const score = questions.reduce((count, item, index) => count + (answers[index] === item.correctOptionId ? 1 : 0), 0);
    const previousBest = progress.bestQuizScores[module.id] ?? 0;
    setPointsEarned(Math.max(0, score - previousBest) * 10);
    recordQuizResult(module.id, score);
    setStage('result');
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: `Quiz: ${module.title}`, headerShown: false }} />
      {stage === 'questions' ? (
        <>
          <View style={[styles.topBar, { borderColor: colors.border }]}>
            <Pressable accessibilityRole="button" onPress={() => setShowExitConfirmation(true)} hitSlop={12}>
              <Text style={[styles.exit, { color: colors.text }]}>× <Text style={styles.exitLabel}>Sair</Text></Text>
            </Pressable>
            <Text style={[styles.counter, { color: colors.text }]}>Questão {currentIndex + 1} de {questions.length}</Text>
            <View style={styles.topSpacer} />
          </View>
          <View style={styles.progressLine}><ProgressBar value={(currentIndex + 1) / questions.length} /></View>
          <ScrollView contentContainerStyle={styles.questionContent} showsVerticalScrollIndicator={false}>
            <View style={[styles.scenario, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.scenarioLabel, { color: colors.accent }]}>CENÁRIO</Text>
              <Text style={[styles.scenarioText, { color: colors.text }]}>{question.scenario}</Text>
            </View>
            <Text style={[styles.prompt, { color: colors.text }]}>{question.prompt}</Text>
            <View style={styles.options}>
              {question.options.map((option, index) => {
                const selected = selectedOption === option.id;
                return (
                  <Pressable
                    key={option.id}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                    aria-checked={selected}
                    onPress={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === currentIndex ? option.id : value))}
                    style={({ pressed }) => [
                      styles.option,
                      { backgroundColor: selected ? colors.accentSoft : colors.surface, borderColor: selected ? colors.accent : colors.border },
                      pressed && styles.pressed,
                    ]}
                  >
                    <View style={[styles.radio, { borderColor: selected ? colors.accent : colors.tabIconDefault }]}>
                      {selected ? <View style={[styles.radioDot, { backgroundColor: colors.accent }]} /> : null}
                    </View>
                    <Text style={[styles.optionLetter, { color: colors.accent }]}>{String.fromCharCode(65 + index)}.</Text>
                    <Text style={[styles.optionText, { color: colors.text }]}>{option.text}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
          <View style={[styles.footer, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <View style={styles.footerButtons}>
              {currentIndex > 0 ? (
                <View style={styles.footerButton}><ActionButton onPress={() => setCurrentIndex((index) => index - 1)} secondary>Anterior</ActionButton></View>
              ) : <View style={styles.footerButton} />}
              <View style={styles.footerButton}>
                <ActionButton
                  disabled={!ready || !selectedOption}
                  onPress={() => currentIndex === questions.length - 1 ? finishQuiz() : setCurrentIndex((index) => index + 1)}
                >
                  {currentIndex === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima'}
                </ActionButton>
              </View>
            </View>
          </View>
        </>
      ) : stage === 'result' ? (
        <ScrollView contentContainerStyle={styles.resultContent}>
          <Text style={[styles.resultEyebrow, { color: colors.accent }]}>QUIZ CONCLUÍDO</Text>
          <Text style={[styles.resultTitle, { color: colors.text }]}>Mandou bem!</Text>
          <Text style={[styles.resultScore, { color: colors.text }]}>{correctCount}/{questions.length} acertos</Text>
          <Text style={[styles.resultDescription, { color: colors.tabIconDefault }]}>
            {pointsEarned > 0 ? `Você ganhou +${pointsEarned} XP nesta rodada.` : 'Você manteve sua melhor pontuação. Continue revisando as explicações.'}
          </Text>
          <View style={styles.resultButtons}>
            <ActionButton onPress={() => setStage('review')}>Ver gabarito</ActionButton>
            <ActionButton onPress={() => router.back()} secondary>Voltar aos temas</ActionButton>
            <ActionButton
              onPress={() => {
                setAnswers(questions.map(() => undefined));
                setCurrentIndex(0);
                setStage('questions');
              }}
              secondary
            >
              Refazer quiz
            </ActionButton>
          </View>
        </ScrollView>
      ) : (
        <>
          <View style={[styles.reviewHeader, { borderColor: colors.border }]}>
            <Pressable accessibilityRole="button" onPress={() => setStage('result')}><Text style={[styles.backToResult, { color: colors.tint }]}>‹ Resultado</Text></Pressable>
            <Text style={[styles.reviewTitle, { color: colors.text }]}>Gabarito · {correctCount}/{questions.length}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.reviewContent}>
            {questions.map((item, index) => (
              <AnswerReviewCard key={item.id} answers={answers} index={index} item={item} />
            ))}
          </ScrollView>
        </>
      )}

      <Modal animationType="fade" transparent visible={showExitConfirmation} onRequestClose={() => setShowExitConfirmation(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Sair do quiz?</Text>
            <Text style={[styles.modalMessage, { color: colors.tabIconDefault }]}>Deseja sair? Seu progresso nesta rodada será perdido.</Text>
            <View style={styles.modalButtons}>
              <View style={styles.modalButton}><ActionButton onPress={() => setShowExitConfirmation(false)} secondary>Continuar</ActionButton></View>
              <View style={styles.modalButton}><ActionButton onPress={() => { setShowExitConfirmation(false); router.back(); }}>Sair</ActionButton></View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function AnswerReviewCard({ item, index, answers }: { item: QuizQuestion; index: number; answers: (string | undefined)[] }) {
  const colors = Colors[useColorScheme()];
  const selected = answers[index];
  const correct = selected === item.correctOptionId;
  return (
    <View style={[styles.reviewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.reviewQuestionNumber, { color: colors.accent }]}>QUESTÃO {index + 1} · {correct ? 'ACERTOU' : 'REVISE'}</Text>
      <Text style={[styles.reviewPrompt, { color: colors.text }]}>{item.prompt}</Text>
      {item.options.map((option, optionIndex) => {
        const wasSelected = selected === option.id;
        const isCorrect = item.correctOptionId === option.id;
        const stateColor = isCorrect ? colors.accent : wasSelected ? '#C33D48' : colors.tabIconDefault;
        return (
          <View key={option.id} style={[styles.reviewOption, { borderColor: wasSelected || isCorrect ? stateColor : colors.border }]}>
            <Text style={[styles.reviewOptionText, { color: stateColor }]}>
              {String.fromCharCode(65 + optionIndex)}. {option.text}
            </Text>
            {wasSelected ? <Text style={[styles.optionTag, { color: stateColor }]}>Sua resposta</Text> : null}
            {isCorrect && !wasSelected ? <Text style={[styles.optionTag, { color: stateColor }]}>Resposta correta</Text> : null}
          </View>
        );
      })}
      <View style={[styles.explanation, { backgroundColor: colors.accentSoft }]}>
        <Text style={[styles.explanationLabel, { color: colors.accent }]}>POR QUÊ?</Text>
        <Text style={[styles.explanationText, { color: colors.text }]}>{item.explanation}</Text>
      </View>
      <SourceReferenceList references={item.references} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { alignItems: 'center', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  exit: { fontSize: 26, fontWeight: '500', lineHeight: 28 },
  exitLabel: { fontSize: 15, fontWeight: '700' },
  counter: { fontSize: 14, fontWeight: '800' },
  topSpacer: { width: 38 },
  progressLine: { height: 8, paddingHorizontal: 20, paddingTop: 4 },
  questionContent: { gap: 20, padding: 20, paddingBottom: 24 },
  scenario: { borderRadius: 16, borderWidth: 1, gap: 8, padding: 16 },
  scenarioLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  scenarioText: { fontSize: 15, lineHeight: 23 },
  prompt: { fontSize: 21, fontWeight: '800', lineHeight: 29 },
  options: { gap: 10 },
  option: { alignItems: 'center', borderRadius: 14, borderWidth: 1.5, flexDirection: 'row', gap: 10, minHeight: 64, padding: 14 },
  radio: { alignItems: 'center', borderRadius: 99, borderWidth: 2, height: 20, justifyContent: 'center', width: 20 },
  radioDot: { borderRadius: 99, height: 10, width: 10 },
  optionLetter: { fontSize: 15, fontWeight: '900' },
  optionText: { flex: 1, fontSize: 15, lineHeight: 22 },
  pressed: { opacity: 0.78 },
  footer: { borderTopWidth: 1, paddingHorizontal: 16, paddingVertical: 10 },
  footerButtons: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  footerButton: { flex: 1 },
  resultContent: { flexGrow: 1, gap: 12, justifyContent: 'center', padding: 24 },
  resultEyebrow: { fontSize: 12, fontWeight: '900', letterSpacing: 1, textAlign: 'center' },
  resultTitle: { fontSize: 32, fontWeight: '900', textAlign: 'center' },
  resultScore: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  resultDescription: { fontSize: 15, lineHeight: 23, textAlign: 'center' },
  resultButtons: { gap: 10, marginTop: 16 },
  reviewHeader: { borderBottomWidth: 1, gap: 8, padding: 16 },
  backToResult: { fontSize: 14, fontWeight: '800' },
  reviewTitle: { fontSize: 20, fontWeight: '900' },
  reviewContent: { gap: 14, padding: 16 },
  reviewCard: { borderRadius: 16, borderWidth: 1, gap: 12, padding: 14 },
  reviewQuestionNumber: { fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  reviewPrompt: { fontSize: 17, fontWeight: '800', lineHeight: 24 },
  reviewOption: { borderRadius: 10, borderWidth: 1, gap: 3, padding: 10 },
  reviewOptionText: { fontSize: 14, lineHeight: 21 },
  optionTag: { fontSize: 11, fontWeight: '800' },
  explanation: { borderRadius: 12, gap: 6, padding: 12 },
  explanationLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
  explanationText: { fontSize: 14, lineHeight: 21 },
  modalBackdrop: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.56)', flex: 1, justifyContent: 'center', padding: 24 },
  modalCard: { borderRadius: 18, borderWidth: 1, gap: 12, maxWidth: 440, padding: 20, width: '100%' },
  modalTitle: { fontSize: 20, fontWeight: '900' },
  modalMessage: { fontSize: 15, lineHeight: 22 },
  modalButtons: { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalButton: { flex: 1 },
});
