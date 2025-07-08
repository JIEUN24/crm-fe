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

import { Button, Input, StatCard, Dialog } from '@/components/ui';

import '@/pages/samples/Samples.scss';

function Samples() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      </section>
    </div>
  );
}

export default Samples;
