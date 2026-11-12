import { useId, useState, type ReactNode } from 'react'

type AccordionProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  number?: string
  nested?: boolean
  icon?: IconName
}

type IconName =
  | 'account'
  | 'create'
  | 'chat'
  | 'cover'
  | 'idea'
  | 'video'
  | 'heart'
  | 'help'
  | 'briefcase'
  | 'people'
  | 'season'
  | 'trend'
  | 'steps'

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    account: (
      <>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 19c.65-3.05 2.8-4.75 6.5-4.75 1.05 0 1.98.14 2.78.43" />
        <path d="m16.25 18 1.35 1.35 2.9-3.2" />
      </>
    ),
    create: (
      <>
        <path d="M13.25 5.25 18.75 10.75" />
        <path d="m6 18 2.7-.55 10.1-10.1a1.75 1.75 0 0 0-2.48-2.48L6.22 14.97 6 18Z" />
        <path d="M12 19.25H5" />
      </>
    ),
    chat: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.48 8.7 8.7 0 0 1-3.6-.86L4 19l1.15-3.65A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M8.25 11.5h.01M12 11.5h.01M15.75 11.5h.01" />
      </>
    ),
    cover: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2.5" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m6.5 17 4-4 2.6 2.6 1.7-1.7 2.7 3.1" />
      </>
    ),
    idea: (
      <>
        <path d="M8.5 15.5c-1.45-1.08-2.4-2.82-2.4-4.78a5.9 5.9 0 1 1 9.4 4.78c-.85.64-1.2 1.18-1.25 2H9.75c-.05-.82-.4-1.36-1.25-2Z" />
        <path d="M9.5 20h5M9.75 17.5h4.5" />
      </>
    ),
    video: (
      <>
        <rect x="3.5" y="6" width="12.5" height="12" rx="2.5" />
        <path d="m16 10 4-2v8l-4-2M8.5 10l3.5 2-3.5 2v-4Z" />
      </>
    ),
    heart: (
      <path d="M20.1 9.3c0 5-8.1 9.45-8.1 9.45S3.9 14.3 3.9 9.3a4.05 4.05 0 0 1 7.25-2.48L12 7.9l.85-1.08A4.05 4.05 0 0 1 20.1 9.3Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.8 9.35a2.35 2.35 0 1 1 3.52 2.04c-.9.52-1.32.92-1.32 1.86M12 16.65h.01" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3.5" y="7" width="17" height="12" rx="2.5" />
        <path d="M9 7V5.5h6V7M3.5 12h17M10 12v1h4v-1" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="10" r="2.25" />
        <path d="M3.75 19c.45-3.2 2.2-4.75 5.25-4.75s4.8 1.55 5.25 4.75M14.5 15c2.9-.65 5.05.75 5.5 3.5" />
      </>
    ),
    season: (
      <>
        <path d="M19.5 4.5C11 4.5 5.25 8.15 5.25 14.1c0 3.1 2 5.4 5.25 5.4 5.75 0 8.75-5.25 9-15Z" />
        <path d="M4.5 20c2.1-4.4 5.35-7.7 10.5-10" />
      </>
    ),
    trend: (
      <>
        <path d="M4 18 9.5 12.5l3.5 3.25L20 7.5" />
        <path d="M14.5 7.5H20V13" />
      </>
    ),
    steps: (
      <>
        <path d="M5 7h4M5 12h8M5 17h14" />
        <circle cx="17.5" cy="7" r="2.5" />
      </>
    ),
  }

  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`chevron ${open ? 'chevron--open' : ''}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Accordion({
  title,
  children,
  defaultOpen = false,
  number,
  nested = false,
  icon,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()
  const titleParts = nested ? title.split(' ') : []

  return (
    <article className={`${nested ? 'nested-accordion' : 'step-card'} ${open ? 'is-open' : ''}`}>
      <button
        className={nested ? 'nested-trigger' : 'step-trigger'}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={nested ? 'nested-title' : 'step-title'}>
          {icon && <span className={`${nested ? 'nested-icon' : 'step-icon'} accent-${icon}`}><Icon name={icon} /></span>}
          {number && <span className="step-number">{number}</span>}
          {titleParts.length > 1 ? (
            <span className="nested-title-copy">
              <span className="nested-title-key">{titleParts[0]}</span>
              <span>{titleParts.slice(1).join(' ')}</span>
            </span>
          ) : (
            <span>{title}</span>
          )}
        </span>
        <span className="chevron-wrap">
          <Chevron open={open} />
        </span>
      </button>
      <div className="accordion-grid" id={contentId} aria-hidden={!open}>
        <div className="accordion-overflow">
          <div className={nested ? 'nested-content' : 'step-content'}>{children}</div>
        </div>
      </div>
    </article>
  )
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul className="bullet-list">{children}</ul>
}

function TopicExample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="topic-example">
      <span className="topic-example__label">{label}</span>
      <p>{children}</p>
    </div>
  )
}

const faqItems = [
  {
    question: '我应该发布视频还是图文？',
    answer: '都可以，只要内容真诚和优质，都能获得流量。',
  },
  {
    question: '为什么我必须完成医生的专业资质认证？',
    answer:
      '医疗健康领域属于专业领域，根据相关规定，未经专业认证的用户将会被平台采取内容限流、昵称简介重置等处置。',
  },
  {
    question: '我可以在社媒上给患者提供具体的医疗建议吗？',
    answer:
      '在未经严谨辩证诊断的情况下，不建议在私信、评论区、直播等场景给患者提供明确的医疗建议，包括用药建议、诊疗判断等，以规避可能的风险。',
  },
  {
    question: '我可以通过社媒引导患者来我的医院科室就诊吗？',
    answer:
      '可以引导患者到您的合规问诊平台或所在医院就诊，但平台通常禁止直接提供联系方式，如微信、电话等。',
  },
  {
    question: '我发布什么样的内容可能会被平台限流？',
    answer:
      '避免使用“保证治愈”、“百分之百”等夸张或绝对化的词汇；避免发布血腥敏感画面（如手术创面、病变画面、病理组织）；严格打码保护患者隐私；提及药品尽量使用通用化学名，避免商业品牌名。',
  },
]

const topicGroups = [
  {
    title: '职业特色内容',
    number: '01',
    tags: ['白大褂朋友已在线', '我的白大褂朋友', '急诊室被困事件'],
  },
  {
    title: '垂类人群内容',
    number: '02',
    tags: [
      '38节女性健康“有点毛病，也没关系”',
      '代际健康问题“爸妈是我的健康搭子”',
      '职场健康“带薪健康3分钟”',
      '工位动员大会',
      '打工人的伤胃检讨大会',
      '青年睡眠“先睡一觉再说”',
    ],
  },
  {
    title: '季节流行内容',
    number: '03',
    tags: ['流感季不慌手册', '过敏人请听劝'],
  },
  {
    title: '社会热点内容',
    number: '04',
    tags: [],
  },
]

function App() {
  return (
    <main>
      <header className="hero">
        <div className="hero-aurora hero-aurora--blue" />
        <div className="hero-aurora hero-aurora--purple" />
        <div className="hero-badge">
          <Icon name="heart" />
          <span>医生爆款社媒账号打造指南</span>
        </div>
        <h1>三步成为朋友感医生博主</h1>
        <div className="hero-meta" aria-label="指南特点">
          <span><Icon name="account" />专业</span>
          <span><Icon name="chat" />真诚</span>
          <span><Icon name="heart" />温暖</span>
        </div>
      </header>

      <div className="content">
        <section aria-label="核心三步骤打造指南">
          <div className="steps">
            <Accordion title="第一步：注册账号，亮出专业身份" icon="account">
              <BulletList>
                <li><strong>完成医生执业资质认证</strong>，保护账号不被平台限流。</li>
                <li>填写昵称和简介，建议简单明了，<strong>突出专业领域</strong>，例如“XX科XX医生”。</li>
                <li>设置头像，可选用<strong>穿白大褂的正脸或半身照</strong>，展现自然亲切的专业形象，尽量不要用过于严肃的证件照。</li>
              </BulletList>
            </Accordion>

            <Accordion title="第二步：像和朋友聊天一样，制作并发布内容" icon="create">
              <div className="nested-list">
                <Accordion title="封面 抓人眼球" icon="cover" nested>
                  <BulletList>
                    <li><span className="fg-inline-bold">封面写上最核心的信息</span>，字数最多不超过 15 个字。</li>
                    <li><span className="fg-inline-bold">使用真实清晰的图片</span>，展现自然的工作状态，避免套用千篇一律的海报模板。</li>
                  </BulletList>
                </Accordion>

                <Accordion title="选题 专业实用" icon="idea" nested>
                  <BulletList>
                    <li>多聊<strong>大众最关心的健康话题</strong>，让医学知识走进吃喝住行，针对百姓真实的困境与需求，给出实用可行的建议。</li>
                    <li>适度呈现<strong>真实的喜怒哀乐与生活碎片</strong>，消除剧本感与说教感。</li>
                    <li>标题体现最关键信息，语气亲切接地气，<strong>字数不超过 20 个字</strong>。</li>
                  </BulletList>
                  <div className="topic-examples">
                    <p className="topic-examples__title">推荐选题清单</p>
                    <TopicExample label="健康科普类">
                      《长期熬夜真会诱发癌症吗？肿瘤医生讲清楚》、《辟谣！揭秘常见抗癌智商税》
                    </TopicExample>
                    <TopicExample label="实用干货类">
                      《身上埋了“输液港”，洗澡、睡觉究竟该怎么护？》、《初次看肿瘤科带齐这4样资料，少跑3趟冤枉路》
                    </TopicExample>
                    <TopicExample label="纪实日常类">
                      《沉浸式上班｜肿瘤科医生的一天》、《今天门诊，一位随访5年的晚期肺癌大哥给我带了自种苹果》
                    </TopicExample>
                  </div>
                </Accordion>

                <Accordion title="内容 自然易懂" icon="video" nested>
                  <BulletList>
                    <li><strong>拍摄状态：</strong>身体放松，带点自然手势，眼神多看镜头，保持视频通话感。</li>
                    <li><strong>背景环境：</strong>展现真实场景，干净整洁的办公室或阳光窗边，不建议用假背景或绿幕。</li>
                    <li><strong>道具展示：</strong>尽量用真实的医学模型，或有趣的表情包辅助。</li>
                    <li><strong>适配手机：</strong>文字建议用表情符号分行分段便于阅读；视频优先竖屏，时长 30 秒至 3 分钟。</li>
                  </BulletList>
                </Accordion>

                <Accordion title="人设 真情实感" icon="heart" nested>
                  <BulletList>
                    <li><strong>真实表达、平等交流</strong>，让网友感受有人情味、有温度的医生朋友。</li>
                    <li>倡导积极健康价值观，<strong>传递人文关怀</strong>，治愈更疗愈。</li>
                  </BulletList>
                </Accordion>
              </div>
            </Accordion>

            <Accordion title="第三步：积极互动，深化医患信任" icon="chat">
              <BulletList>
                <li><strong>专业合规地回复私信</strong>，积极在评论区答疑解惑，鼓励患者，传递信心与希望。</li>
              </BulletList>
            </Accordion>
          </div>
        </section>

        <section aria-labelledby="faq-title">
          <div className="section-heading">
            <span className="section-icon"><Icon name="help" /></span>
            <div>
              <h2 id="faq-title">常见问题</h2>
            </div>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <Accordion key={item.question} title={item.question} nested>
                <p>{item.answer}</p>
              </Accordion>
            ))}
          </div>
        </section>

        <section aria-labelledby="topics-title">
          <div className="section-heading">
            <span className="section-icon"><Icon name="trend" /></span>
            <div>
              <h2 id="topics-title">近期热点</h2>
              <p>找到更有共鸣的表达角度</p>
            </div>
          </div>
          <div className="topic-grid">
            {topicGroups.map((group) => (
              <article className={`topic-card topic-card--${group.number}`} key={group.title}>
                <div className="topic-card__heading">
                  <span className="topic-card__icon">
                    <Icon name={(['briefcase', 'people', 'season', 'trend'] as IconName[])[Number(group.number) - 1]} />
                  </span>
                  <h3>{group.title}</h3>
                </div>
                {group.tags.length > 0 ? (
                  <div className="tags">
                    {group.tags.map((tag, index) => (
                      <span className="tag" key={tag}>
                        <span className="tag__icon">
                          <Icon name={(['idea', 'chat', 'heart', 'video'] as IconName[])[index % 4]} />
                        </span>
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="topic-placeholder">
                    <span className="pulse-dot" />
                    热点持续更新中
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <span>专业</span>
        <i />
        <span>真诚</span>
        <i />
        <span>温暖</span>
      </footer>
    </main>
  )
}

export default App
