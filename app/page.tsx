'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: string;
  part: string;
  question: string;
  type: 'textarea' | 'text' | 'radio' | 'checkbox';
  options?: string[];
  required: boolean;
  dependsOn?: string;
  dependsValue?: string[] | string;
}

const questions: Question[] = [
  // PARTE 1: CONTEXTO DO NEGÓCIO
  {
    id: "p1q1",
    part: "PARTE 1: CONTEXTO DO NEGÓCIO",
    question: "Me conta sobre os tipos de ativos que a sua empresa tokeniza. Como funciona hoje?",
    type: "textarea",
    required: true
  },
  {
    id: "p1q2",
    part: "PARTE 1: CONTEXTO DO NEGÓCIO",
    question: "Quantos clientes ativos vocês têm na plataforma?",
    type: "text",
    required: true
  },
  {
    id: "p1q3",
    part: "PARTE 1: CONTEXTO DO NEGÓCIO",
    question: "Qual é o perfil desses clientes? (tamanho, segmento, tipo de uso)",
    type: "textarea",
    required: true
  },
  {
    id: "p1q4",
    part: "PARTE 1: CONTEXTO DO NEGÓCIO",
    question: "Quais são os principais casos de uso da tokenização que vocês oferecem hoje?",
    type: "textarea",
    required: true
  },

  // PARTE 2: ORIGEM DA IDEIA E PROBLEMA
  {
    id: "p2q1",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Como surgiu a ideia de oferecer emissão de stablecoins para seus clientes?",
    type: "textarea",
    required: true
  },
  {
    id: "p2q2",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Foi demanda de algum cliente específico ou vocês identificaram essa oportunidade internamente?",
    type: "radio",
    options: ["Demanda de clientes", "Identificação interna", "Ambos"],
    required: true
  },
  {
    id: "p2q3",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "[SE FOI DEMANDA] Quantos clientes já pediram isso explicitamente?",
    type: "text",
    required: false,
    dependsOn: "p2q2",
    dependsValue: ["Demanda de clientes", "Ambos"]
  },
  {
    id: "p2q4",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "[SE FOI DEMANDA] O que exatamente esses clientes pediram?",
    type: "textarea",
    required: false,
    dependsOn: "p2q2",
    dependsValue: ["Demanda de clientes", "Ambos"]
  },
  {
    id: "p2q5",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "[SE FOI DEMANDA] Que problema específico esses clientes estavam tentando resolver?",
    type: "textarea",
    required: false,
    dependsOn: "p2q2",
    dependsValue: ["Demanda de clientes", "Ambos"]
  },
  {
    id: "p2q6",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Me explica melhor: que tipo de compliance é necessário e por que isso é um impeditivo?",
    type: "textarea",
    required: true
  },
  {
    id: "p2q7",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Por que seus clientes querem emitir stablecoins? O que ganham com isso que não têm hoje?",
    type: "textarea",
    required: true
  },
  {
    id: "p2q8",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Seus clientes já tentaram usar alternativas existentes? (USDC, USDT, Pix, TED etc.)",
    type: "radio",
    options: ["Sim", "Não", "Não sei"],
    required: true
  },
  {
    id: "p2q9",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "[SE SIM] Por que essas alternativas não funcionaram?",
    type: "textarea",
    required: false,
    dependsOn: "p2q8",
    dependsValue: ["Sim"]
  },
  {
    id: "p2q10",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Se essa solução não existisse, o que aconteceria com esses clientes?",
    type: "checkbox",
    options: ["Desistiriam da ideia", "Usariam outra solução", "Negócio em risco", "Continuariam igual", "Outro"],
    required: true
  },
  {
    id: "p2q11",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Como seus clientes movimentam dinheiro hoje? Descreva o fluxo completo.",
    type: "textarea",
    required: true
  },
  {
    id: "p2q12",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Quais as principais dores do processo atual?",
    type: "checkbox",
    options: ["Custos altos", "Lentidão", "Falta de rastreabilidade", "Problemas internacionais", "Compliance complexo", "Outro"],
    required: true
  },
  {
    id: "p2q13",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Quanto esse problema custa hoje (tempo, dinheiro, oportunidades perdidas)?",
    type: "textarea",
    required: true
  },
  {
    id: "p2q14",
    part: "PARTE 2: ORIGEM DA IDEIA E PROBLEMA",
    question: "Esse problema é um nice to have ou must have?",
    type: "radio",
    options: ["Nice to have", "Must have", "Não sei"],
    required: true
  },

  // PARTE 3: SOLUÇÃO IMAGINADA
  {
    id: "p3q1",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Descreva como você imagina que a solução funcionaria (depósito → resgate).",
    type: "textarea",
    required: true
  },
  {
    id: "p3q2",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Por que cada cliente precisa ter seu próprio token (ex: BRL1, BRL2)?",
    type: "textarea",
    required: true
  },
  {
    id: "p3q3",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Essa separação de tokens é:",
    type: "radio",
    options: ["Requisito legal/regulatório", "Escolha técnica", "Escolha de negócio", "Não sei", "Outro"],
    required: true
  },
  {
    id: "p3q4",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Onde os reais ficariam custodiados?",
    type: "radio",
    options: ["Conta da empresa", "Conta do cliente", "SPE separada", "Ainda não definido", "Outro"],
    required: true
  },
  {
    id: "p3q5",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Tempo entre depósito e mint do token",
    type: "radio",
    options: ["Instantâneo", "Até 1h", "Até 1 dia útil", "+1 dia", "Não definido"],
    required: true
  },
  {
    id: "p3q6",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Existem limites de depósito?",
    type: "checkbox",
    options: ["Mínimo por transação", "Máximo por transação", "Máximo diário", "Sem limites", "Não definido"],
    required: true
  },
  {
    id: "p3q7",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: '"Uso livre da stablecoin" significa o quê exatamente?',
    type: "checkbox",
    options: ["Transferir", "Pagar fornecedores", "Trocar ativos", "Usar em DeFi", "Pagamentos", "Outro"],
    required: true
  },
  {
    id: "p3q8",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Tokens de clientes diferentes podem interagir?",
    type: "radio",
    options: ["Sim", "Não", "Parcialmente", "Não sei", "Outro"],
    required: true
  },
  {
    id: "p3q9",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Onde o cliente final guardaria o token?",
    type: "checkbox",
    options: ["Carteira da empresa", "Carteira própria", "Exchange", "Não definido", "Outro"],
    required: true
  },
  {
    id: "p3q10",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Como seria o processo de resgate dos reais?",
    type: "textarea",
    required: true
  },
  {
    id: "p3q11",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Tempo de liquidação dos resgates",
    type: "radio",
    options: ["Instantâneo", "Até 1h", "1 dia útil", "2 dias úteis", "+2 dias", "Não definido"],
    required: true
  },
  {
    id: "p3q12",
    part: "PARTE 3: SOLUÇÃO IMAGINADA",
    question: "Haverá taxas? Se sim, quais?",
    type: "textarea",
    required: true
  },

  // PARTE 4: REQUISITOS REGULATÓRIOS
  {
    id: "p4q1",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "Já mapearam requisitos regulatórios brasileiros para emissão de stablecoins?",
    type: "radio",
    options: ["Sim (completo)", "Parcialmente", "Não", "Estudando"],
    required: true
  },
  {
    id: "p4q2",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "Já conversaram com advogados especializados em cripto/stablecoins?",
    type: "radio",
    options: ["Sim", "Não", "Planejamos em breve"],
    required: true
  },
  {
    id: "p4q3",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "Quem seria legalmente o emissor do token?",
    type: "radio",
    options: ["Empresa", "Cliente final", "Ambos", "Não sabemos", "Outro"],
    required: true
  },
  {
    id: "p4q4",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "Como funciona o KYC/AML hoje?",
    type: "textarea",
    required: true
  },
  {
    id: "p4q5",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "O KYC/AML mudaria com a emissão de stablecoins?",
    type: "radio",
    options: ["Sim, muito", "Sim, um pouco", "Não mudaria", "Não sabemos"],
    required: true
  },
  {
    id: "p4q6",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "Quem seria responsável pelo KYC do usuário final?",
    type: "radio",
    options: ["Nossa empresa", "O cliente", "Compartilhado", "Não definido"],
    required: true
  },
  {
    id: "p4q7",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "É necessário ser instituição de pagamento regulada pelo BC?",
    type: "radio",
    options: ["Sim", "Não", "Não sabemos", "Investigando"],
    required: true
  },
  {
    id: "p4q8",
    part: "PARTE 4: REQUISITOS REGULATÓRIOS",
    question: "Como seria o compliance de prevenção à lavagem de dinheiro (PLD)?",
    type: "textarea",
    required: false
  },

  // PARTE 5: MODELO DE NEGÓCIO
  {
    id: "p5q1",
    part: "PARTE 5: MODELO DE NEGÓCIO",
    question: "Qual seria o modelo de receita da solução?",
    type: "checkbox",
    options: ["Setup fee", "Fee por transação", "Custody fee", "% sobre volume", "Outro", "Não definido"],
    required: true
  },
  {
    id: "p5q2",
    part: "PARTE 5: MODELO DE NEGÓCIO",
    question: "Quantos clientes precisam usar para ser viável?",
    type: "text",
    required: false
  },
  {
    id: "p5q3",
    part: "PARTE 5: MODELO DE NEGÓCIO",
    question: "Prazo esperado para lançamento",
    type: "radio",
    options: ["1–3 meses", "3–6 meses", "6–12 meses", "+12 meses", "Não definido"],
    required: true
  },

  // PARTE 6: CASOS DE USO CONCRETOS
  {
    id: "p6q1",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "CLIENTE EXEMPLO 1: Descreva um cliente real/tipo de cliente",
    type: "textarea",
    required: true
  },
  {
    id: "p6q2",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 1] Segmento e tamanho",
    type: "text",
    required: true
  },
  {
    id: "p6q3",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 1] Para que usaria a stablecoin?",
    type: "textarea",
    required: true
  },
  {
    id: "p6q4",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 1] Frequência de uso (transações/mês)",
    type: "text",
    required: false
  },
  {
    id: "p6q5",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 1] Volume financeiro mensal",
    type: "text",
    required: false
  },
  {
    id: "p6q6",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 1] Por que a solução atual não serve?",
    type: "textarea",
    required: true
  },
  {
    id: "p6q7",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "CLIENTE EXEMPLO 2: outro cliente diferente",
    type: "textarea",
    required: false
  },
  {
    id: "p6q8",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 2] Segmento e tamanho",
    type: "text",
    required: false,
    dependsOn: "p6q7",
    dependsValue: "filled"
  },
  {
    id: "p6q9",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 2] Para que usaria a stablecoin?",
    type: "textarea",
    required: false,
    dependsOn: "p6q7",
    dependsValue: "filled"
  },
  {
    id: "p6q10",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[Cliente 2] Por que a solução atual não serve?",
    type: "textarea",
    required: false,
    dependsOn: "p6q7",
    dependsValue: "filled"
  },
  {
    id: "p6q11",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "Qual exemplo é mais urgente/importante? Por quê?",
    type: "textarea",
    required: true
  },
  {
    id: "p6q12",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "Já têm clientes comprometidos a testar?",
    type: "radio",
    options: ["Sim (vários)", "Sim (1–2)", "Interessados", "Ainda não"],
    required: true
  },
  {
    id: "p6q13",
    part: "PARTE 6: CASOS DE USO CONCRETOS",
    question: "[SE SIM] Quantos e com que nível de comprometimento?",
    type: "textarea",
    required: false,
    dependsOn: "p6q12",
    dependsValue: ["Sim (vários)", "Sim (1–2)"]
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('stablecoinAnswers');
    const savedIndex = localStorage.getItem('stablecoinIndex');
    if (saved) setAnswers(JSON.parse(saved));
    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
  }, []);

  // Filtrar perguntas visíveis
  useEffect(() => {
    const visible = questions.filter(q => {
      if (!q.dependsOn) return true;
      const depAnswer = answers[q.dependsOn];
      if (!depAnswer) return false;
      if (q.dependsValue === 'filled') return String(depAnswer).length > 0;
      if (Array.isArray(q.dependsValue)) return q.dependsValue.includes(String(depAnswer));
      return String(depAnswer) === q.dependsValue;
    });
    setVisibleQuestions(visible);
  }, [answers]);

  const currentQuestion = visibleQuestions[currentIndex];
  const progress = visibleQuestions.length > 0 ? ((currentIndex + 1) / visibleQuestions.length) * 100 : 0;

  const validateQuestion = () => {
    if (!currentQuestion || !currentQuestion.required) return true;
    const answer = answers[currentQuestion.id];
    const isValid = answer !== undefined && answer !== '' &&
      (Array.isArray(answer) ? answer.length > 0 : String(answer).trim().length > 0);
    if (!isValid) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: true }));
    }
    return isValid;
  };

  const handleNext = () => {
    if (!validateQuestion()) return;
    if (currentIndex < visibleQuestions.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      localStorage.setItem('stablecoinIndex', String(newIndex));
      setErrors({});
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      localStorage.setItem('stablecoinIndex', String(newIndex));
      setErrors({});
    }
  };

  const handleAnswer = (value: string | string[]) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    localStorage.setItem('stablecoinAnswers', JSON.stringify(newAnswers));
    setErrors(prev => ({ ...prev, [currentQuestion.id]: false }));
  };

  const downloadCSV = () => {
    try {
      let csv = 'Stablecoin Discovery Questionnaire - Respostas\n';
      csv += `Data de Preenchimento,${new Date().toLocaleString('pt-BR')}\n\n`;
      csv += 'Pergunta,Resposta\n';

      questions.forEach(q => {
        const answer = answers[q.id] || '(Não respondida)';
        const answerStr = Array.isArray(answer) ? answer.join('; ') : answer;
        const escapedQuestion = `"${q.question.replace(/"/g, '""')}"`;
        const escapedAnswer = `"${answerStr.replace(/"/g, '""')}"`;
        csv += `${escapedQuestion},${escapedAnswer}\n`;
      });

      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `stablecoin-respostas-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Erro ao gerar CSV. Tente novamente.');
    }
  };

  const resetForm = () => {
    localStorage.removeItem('stablecoinAnswers');
    localStorage.removeItem('stablecoinIndex');
    setAnswers({});
    setCurrentIndex(0);
    setCompleted(false);
  };

  if (!mounted || (!currentQuestion && !completed)) {
    return <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full p-8">
        {!completed ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">🧩 Stablecoin Issuers</h1>
              <p className="text-slate-400">Discovery Questionnaire</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm text-slate-400">
                <span>Pergunta {currentIndex + 1} de {visibleQuestions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            {currentQuestion && (
              <div className="mb-8">
                <span className="inline-block bg-slate-700 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {currentQuestion.part}
                </span>
                <label className="block text-lg font-semibold text-white mb-4">
                  {currentQuestion.question}
                  {currentQuestion.required && <span className="text-red-500"> *</span>}
                </label>

                {/* Input Fields */}
                {currentQuestion.type === 'textarea' && (
                  <textarea
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder="Digite sua resposta aqui..."
                    className={`w-full p-3 bg-slate-700 border-2 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors[currentQuestion.id] ? 'border-red-500' : 'border-slate-600 focus:border-cyan-500'
                    }`}
                    rows={5}
                  />
                )}

                {currentQuestion.type === 'text' && (
                  <input
                    type="text"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder="Digite sua resposta..."
                    className={`w-full p-3 bg-slate-700 border-2 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors[currentQuestion.id] ? 'border-red-500' : 'border-slate-600 focus:border-cyan-500'
                    }`}
                  />
                )}

                {currentQuestion.type === 'radio' && currentQuestion.options && (
                  <div className="space-y-2">
                    {currentQuestion.options.map(option => (
                      <label key={option} className="flex items-center p-3 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswer(e.target.value)}
                          className="w-4 h-4 accent-cyan-500 cursor-pointer"
                        />
                        <span className="ml-3 text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'checkbox' && currentQuestion.options && (
                  <div className="space-y-2">
                    {currentQuestion.options.map(option => (
                      <label key={option} className="flex items-center p-3 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          value={option}
                          checked={Array.isArray(answers[currentQuestion.id]) &&
                                   answers[currentQuestion.id].includes(option)}
                          onChange={(e) => {
                            const current = Array.isArray(answers[currentQuestion.id])
                              ? answers[currentQuestion.id]
                              : [];
                            const updated = e.target.checked
                              ? [...current, option]
                              : current.filter(v => v !== option);
                            handleAnswer(updated);
                          }}
                          className="w-4 h-4 accent-cyan-500 cursor-pointer"
                        />
                        <span className="ml-3 text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {errors[currentQuestion.id] && (
                  <p className="text-red-500 text-sm mt-2">Este campo é obrigatório</p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                ← Anterior
              </button>
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105"
              >
                {currentIndex === visibleQuestions.length - 1 ? 'Concluir ✓' : 'Próxima →'}
              </button>
            </div>
          </>
        ) : (
          // Success Screen
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">✅</div>
            <h2 className="text-3xl font-bold text-white mb-4">Parabéns!</h2>
            <p className="text-slate-400 mb-8">
              Você respondeu todas as perguntas do formulário com sucesso.
            </p>
            <button
              onClick={downloadCSV}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-bold rounded-lg mb-3 transition-all transform hover:scale-105"
            >
              📥 Baixar Planilha (CSV)
            </button>
            <button
              onClick={resetForm}
              className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              🔄 Começar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
