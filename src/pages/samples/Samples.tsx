import React, { useState } from 'react';
import {
  PersonIcon,
  EnvelopeOpenIcon,
  LockClosedIcon,
  DashboardIcon,
  BarChartIcon,
  GearIcon,
  HomeIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

import {
  Button,
  Input,
  StatCard,
  Dialog,
  Chip,
  SearchBox,
  Pagination,
  ActionButtons,
} from '@/components/ui';

import '@/pages/samples/Samples.scss';

function Samples() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="samples-page">
      <div className="samples-header">
        <h1>공통 컴포넌트 샘플</h1>
        <p>
          프로젝트에서 사용할 수 있는 공통 컴포넌트들의 다양한 사용 예시입니다.
        </p>
      </div>

      {/* Button 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>Button 컴포넌트</h2>

        <div className="sample-group">
          <h3>Variants</h3>
          <div className="button-grid">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div className="sample-group">
          <h3>Sizes</h3>
          <div className="button-grid">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="sample-group">
          <h3>Design Styles</h3>
          <div className="button-grid">
            <Button design="modern">Modern</Button>
            <Button design="classic">Classic</Button>
          </div>
        </div>

        <div className="sample-group">
          <h3>With Icons</h3>
          <div className="button-grid">
            <Button leftIcon={<PlusIcon />}>Add Item</Button>
            <Button rightIcon={<HomeIcon />}>Go Home</Button>
            <Button leftIcon={<GearIcon />} rightIcon={<PersonIcon />}>
              Settings
            </Button>
          </div>
        </div>

        <div className="sample-group">
          <h3>States</h3>
          <div className="button-grid">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<Button variant="primary" size="md" leftIcon={<PlusIcon />}>
  Add Item
</Button>`}</pre>
        </div>
      </section>

      {/* Input 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>Input 컴포넌트</h2>

        <div className="sample-group">
          <h3>기본 Input 타입들</h3>
          <div className="input-grid">
            <Input
              label="이메일"
              type="email"
              value={emailValue}
              onChange={setEmailValue}
              placeholder="your@email.com"
              icon={<EnvelopeOpenIcon width={18} height={18} />}
            />
            <Input
              label="비밀번호"
              type="password"
              value={passwordValue}
              onChange={setPasswordValue}
              placeholder="비밀번호를 입력하세요"
              icon={<LockClosedIcon width={18} height={18} />}
              showPasswordToggle
            />
            <Input
              label="이름"
              type="text"
              value={nameValue}
              onChange={setNameValue}
              placeholder="이름을 입력하세요"
              icon={<PersonIcon width={18} height={18} />}
            />
            <Input
              label="전화번호 (아이콘 없음)"
              type="tel"
              value={phoneValue}
              onChange={setPhoneValue}
              placeholder="010-1234-5678"
            />
          </div>
        </div>

        <div className="sample-group">
          <h3>필수 필드 및 에러 상태</h3>
          <div className="input-grid">
            <Input
              label="필수 이메일"
              required
              type="email"
              value=""
              onChange={() => {}}
              placeholder="your@email.com"
              icon={<EnvelopeOpenIcon width={18} height={18} />}
            />
            <Input
              label="에러 상태"
              type="text"
              value=""
              onChange={() => {}}
              placeholder="에러가 있는 입력"
              error="올바른 형식을 입력해주세요."
              icon={<PersonIcon width={18} height={18} />}
            />
            <Input
              label="비활성화 상태"
              type="text"
              value="수정할 수 없음"
              onChange={() => {}}
              disabled
              icon={<GearIcon width={18} height={18} />}
            />
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<Input
  label="이메일"
  required
  type="email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  icon={<EnvelopeOpenIcon width={18} height={18} />}
/>`}</pre>
        </div>
      </section>

      {/* StatCard 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>StatCard 컴포넌트</h2>

        <div className="sample-group">
          <h3>다양한 색상과 트렌드</h3>
          <div className="card-grid">
            <StatCard
              title="총 매출"
              value="₩12,345,678"
              change="+12.5%"
              trend="up"
              icon={<BarChartIcon width={24} height={24} />}
              color="blue"
            />
            <StatCard
              title="신규 고객"
              value="1,234"
              change="+8.2%"
              trend="up"
              icon={<PersonIcon width={24} height={24} />}
              color="green"
            />
            <StatCard
              title="활성 프로젝트"
              value="56"
              change="-2.1%"
              trend="down"
              icon={<DashboardIcon width={24} height={24} />}
              color="purple"
            />
            <StatCard
              title="대기 중인 작업"
              value="23"
              change="+5.7%"
              trend="up"
              icon={<GearIcon width={24} height={24} />}
              color="orange"
            />
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<StatCard
  title="총 매출"
  value="₩12,345,678"
  change="+12.5%"
  trend="up"
  icon={<BarChartIcon width={24} height={24} />}
  color="blue"
/>`}</pre>
        </div>
      </section>

      {/* Chip 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>Chip 컴포넌트</h2>

        <div className="sample-group">
          <h3>Variants</h3>
          <div className="chip-grid">
            <Chip variant="primary">Primary</Chip>
            <Chip variant="secondary">Secondary</Chip>
            <Chip variant="success">Success</Chip>
            <Chip variant="warning">Warning</Chip>
            <Chip variant="danger">Danger</Chip>
            <Chip variant="info">Info</Chip>
          </div>
        </div>

        <div className="sample-group">
          <h3>Colors (Custom)</h3>
          <div className="chip-grid">
            <Chip color="purple">Purple</Chip>
            <Chip color="green">Green</Chip>
            <Chip color="blue">Blue</Chip>
            <Chip color="orange">Orange</Chip>
            <Chip color="red">Red</Chip>
            <Chip color="gray">Gray</Chip>
          </div>
        </div>

        <div className="sample-group">
          <h3>Sizes</h3>
          <div className="chip-grid">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
        </div>

        <div className="sample-group">
          <h3>With Icons</h3>
          <div className="chip-grid">
            <Chip leftIcon={<PersonIcon />} color="blue">
              User
            </Chip>
            <Chip rightIcon={<BarChartIcon />} color="green">
              Analytics
            </Chip>
            <Chip leftIcon={<GearIcon />} color="purple">
              Settings
            </Chip>
          </div>
        </div>

        <div className="sample-group">
          <h3>Removable</h3>
          <div className="chip-grid">
            <Chip
              removable
              onRemove={() => alert('Chip removed!')}
              color="blue"
            >
              JavaScript
            </Chip>
            <Chip
              removable
              onRemove={() => alert('Chip removed!')}
              color="green"
            >
              React
            </Chip>
            <Chip
              removable
              onRemove={() => alert('Chip removed!')}
              color="orange"
            >
              TypeScript
            </Chip>
          </div>
        </div>

        <div className="sample-group">
          <h3>고객 상태 (고객관리 스타일)</h3>
          <div className="chip-grid">
            <Chip color="purple">VIP</Chip>
            <Chip color="green">활성</Chip>
            <Chip color="blue">리드</Chip>
            <Chip color="gray">비활성</Chip>
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<Chip variant="primary" size="md">
  기본 칩
</Chip>

<Chip 
  color="purple" 
  leftIcon={<PersonIcon />}
  removable
  onRemove={() => handleRemove()}
>
  제거 가능한 칩
</Chip>`}</pre>
        </div>
      </section>

      {/* Dialog 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>Dialog 컴포넌트</h2>

        <div className="sample-group">
          <h3>기본 다이얼로그</h3>
          <div className="button-grid">
            <Button onClick={() => setIsDialogOpen(true)}>
              다이얼로그 열기
            </Button>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title="샘플 다이얼로그"
          >
            <div className="dialog-content-sample">
              <p>이것은 다이얼로그 컴포넌트의 사용 예시입니다.</p>
              <p>다양한 내용을 포함할 수 있습니다.</p>

              <div className="dialog-actions">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  취소
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>확인</Button>
              </div>
            </div>
          </Dialog>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="다이얼로그 제목"
>
  <div>다이얼로그 내용</div>
</Dialog>`}</pre>
        </div>
      </section>

      {/* SearchBox 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>SearchBox 컴포넌트</h2>

        <div className="sample-group">
          <h3>기본 검색박스</h3>
          <div className="search-samples">
            <SearchBox
              value={searchValue}
              onChange={setSearchValue}
              placeholder="고객명, 이메일, 회사명으로 검색..."
            />
            <SearchBox
              value=""
              onChange={() => {}}
              placeholder="상품명으로 검색..."
            />
            <SearchBox
              value=""
              onChange={() => {}}
              placeholder="주문번호로 검색..."
            />
          </div>
        </div>

        <div className="sample-group">
          <h3>비활성화 상태</h3>
          <div className="search-samples">
            <SearchBox
              value="검색어"
              onChange={() => {}}
              placeholder="비활성화된 검색박스"
              disabled
            />
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<SearchBox
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="고객명, 이메일, 회사명으로 검색..."
/>`}</pre>
        </div>
      </section>

      {/* Pagination 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>Pagination 컴포넌트</h2>

        <div className="sample-group">
          <h3>다양한 데이터 크기</h3>
          <div className="pagination-samples">
            <div className="pagination-sample-item">
              <p>25개 항목 (첫 번째 페이지)</p>
              <Pagination
                currentPage={1}
                totalItems={25}
                itemsPerPage={10}
                onPageChange={setCurrentPage}
              />
            </div>

            <div className="pagination-sample-item">
              <p>150개 항목 (5번째 페이지)</p>
              <Pagination
                currentPage={5}
                totalItems={150}
                itemsPerPage={10}
                onPageChange={setCurrentPage}
              />
            </div>

            <div className="pagination-sample-item">
              <p>7개 항목 (마지막 페이지)</p>
              <Pagination
                currentPage={1}
                totalItems={7}
                itemsPerPage={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<Pagination
  currentPage={currentPage}
  totalItems={filteredData.length}
  itemsPerPage={10}
  onPageChange={setCurrentPage}
/>`}</pre>
        </div>
      </section>

      {/* ActionButtons 컴포넌트 샘플 */}
      <section className="component-section">
        <h2>ActionButtons 컴포넌트</h2>

        <div className="sample-group">
          <h3>전체 액션 버튼</h3>
          <div className="action-samples">
            <div className="action-sample-item">
              <span>모든 버튼:</span>
              <ActionButtons
                onView={() => alert('상세보기 클릭!')}
                onEdit={() => alert('편집 클릭!')}
                onDelete={() => alert('삭제 클릭!')}
              />
            </div>
          </div>
        </div>

        <div className="sample-group">
          <h3>선택적 버튼 표시</h3>
          <div className="action-samples">
            <div className="action-sample-item">
              <span>보기만:</span>
              <ActionButtons
                onView={() => alert('상세보기만 가능')}
                showEdit={false}
                showDelete={false}
              />
            </div>

            <div className="action-sample-item">
              <span>편집, 삭제만:</span>
              <ActionButtons
                onEdit={() => alert('편집 클릭!')}
                onDelete={() => alert('삭제 클릭!')}
                showView={false}
              />
            </div>
          </div>
        </div>

        <div className="sample-group">
          <h3>크기 변형</h3>
          <div className="action-samples">
            <div className="action-sample-item">
              <span>Small:</span>
              <ActionButtons
                size="sm"
                onView={() => alert('Small 버튼')}
                onEdit={() => alert('Small 버튼')}
                onDelete={() => alert('Small 버튼')}
              />
            </div>

            <div className="action-sample-item">
              <span>Medium:</span>
              <ActionButtons
                size="md"
                onView={() => alert('Medium 버튼')}
                onEdit={() => alert('Medium 버튼')}
                onDelete={() => alert('Medium 버튼')}
              />
            </div>

            <div className="action-sample-item">
              <span>Large:</span>
              <ActionButtons
                size="lg"
                onView={() => alert('Large 버튼')}
                onEdit={() => alert('Large 버튼')}
                onDelete={() => alert('Large 버튼')}
              />
            </div>
          </div>
        </div>

        <div className="code-example">
          <h4>사용 예시</h4>
          <pre>{`<ActionButtons
  onView={() => handleView(item)}
  onEdit={() => handleEdit(item)}
  onDelete={() => handleDelete(item)}
  size="md"
/>`}</pre>
        </div>
      </section>

      {/* 조합 예시 */}
      <section className="component-section">
        <h2>컴포넌트 조합 예시</h2>

        <div className="sample-group">
          <h3>로그인 폼 스타일</h3>
          <div className="form-sample">
            <Input
              label="이메일"
              required
              type="email"
              value=""
              onChange={() => {}}
              placeholder="your@email.com"
              icon={<EnvelopeOpenIcon width={18} height={18} />}
            />
            <Input
              label="비밀번호"
              required
              type="password"
              value=""
              onChange={() => {}}
              placeholder="비밀번호를 입력하세요"
              icon={<LockClosedIcon width={18} height={18} />}
              showPasswordToggle
            />
            <div className="form-actions">
              <Button variant="outline" size="md">
                취소
              </Button>
              <Button variant="primary" size="md">
                로그인
              </Button>
            </div>
          </div>
        </div>

        <div className="sample-group">
          <h3>데이터 목록 관리 (고객관리 스타일)</h3>
          <div className="data-management-sample">
            {/* 헤더 */}
            <div className="data-header">
              <div className="data-title">
                <h4>고객 목록</h4>
                <p>총 125명의 고객</p>
              </div>
              <Button variant="primary" leftIcon={<PlusIcon />}>
                새 고객 추가
              </Button>
            </div>

            {/* 검색 및 필터 */}
            <div className="data-controls">
              <SearchBox
                value={searchValue}
                onChange={setSearchValue}
                placeholder="고객명, 이메일, 회사명으로 검색..."
              />
              <div className="filter-controls">
                <Chip color="blue" removable onRemove={() => {}}>
                  VIP 고객
                </Chip>
                <Chip color="green" removable onRemove={() => {}}>
                  활성
                </Chip>
              </div>
            </div>

            {/* 가상 테이블 */}
            <div className="sample-table">
              <div className="table-header">
                <div>고객명</div>
                <div>이메일</div>
                <div>상태</div>
                <div>액션</div>
              </div>

              <div className="table-row">
                <div>김철수</div>
                <div>kim@example.com</div>
                <div>
                  <Chip color="purple" size="sm">
                    VIP
                  </Chip>
                </div>
                <div>
                  <ActionButtons
                    onView={() => alert('김철수 상세보기')}
                    onEdit={() => alert('김철수 편집')}
                    onDelete={() => alert('김철수 삭제')}
                    size="sm"
                  />
                </div>
              </div>

              <div className="table-row">
                <div>이영희</div>
                <div>lee@example.com</div>
                <div>
                  <Chip color="green" size="sm">
                    활성
                  </Chip>
                </div>
                <div>
                  <ActionButtons
                    onView={() => alert('이영희 상세보기')}
                    onEdit={() => alert('이영희 편집')}
                    onDelete={() => alert('이영희 삭제')}
                    size="sm"
                  />
                </div>
              </div>

              <div className="table-row">
                <div>박민수</div>
                <div>park@example.com</div>
                <div>
                  <Chip color="blue" size="sm">
                    리드
                  </Chip>
                </div>
                <div>
                  <ActionButtons
                    onView={() => alert('박민수 상세보기')}
                    onEdit={() => alert('박민수 편집')}
                    onDelete={() => alert('박민수 삭제')}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* 페이지네이션 */}
            <Pagination
              currentPage={currentPage}
              totalItems={125}
              itemsPerPage={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Samples;
