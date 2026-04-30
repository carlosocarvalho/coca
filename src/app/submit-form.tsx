'use client';

import { useState } from 'react';
import { copy, ceoEmail } from './copy';

type Status = 'idle' | 'submitting' | 'error';

const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const thankYouUrl = `${basePath}/obrigado/`;

type Values = {
  name: string;
  projectUrl: string;
  problem: string;
  email: string;
};

function buildMailto(values: Values) {
  const subject = `[COCA] novo problema enviado por ${values.name}`;
  const body = [
    `Nome: ${values.name}`,
    `E-mail: ${values.email}`,
    `Projeto: ${values.projectUrl}`,
    '',
    'Problema:',
    values.problem,
  ].join('\n');
  return `mailto:${ceoEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function SubmitForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this. Bots almost always do.
    if (String(data.get('website') ?? '').trim()) {
      // Pretend success so the bot doesn't retry.
      window.location.href = thankYouUrl;
      return;
    }

    const values: Values = {
      name: String(data.get('name') ?? '').trim(),
      projectUrl: String(data.get('projectUrl') ?? '').trim(),
      problem: String(data.get('problem') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
    };

    if (!values.name || !values.projectUrl || !values.problem || !values.email) {
      setStatus('error');
      setErrorMsg('Preenche todos os campos antes de enviar.');
      return;
    }

    if (!web3formsKey) {
      // No sink configured yet → preaddressed mailto so the user still has a
      // way to reach us. Documented in README; CEO sets the env var to upgrade.
      window.location.href = buildMailto(values);
      return;
    }

    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `[COCA] novo problema: ${values.name}`,
          from_name: values.name,
          email: values.email,
          name: values.name,
          projectUrl: values.projectUrl,
          problem: values.problem,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) {
        throw new Error(`web3forms returned ${res.status}`);
      }
      window.location.href = thankYouUrl;
    } catch {
      setStatus('error');
      setErrorMsg(copy.form.error);
    }
  }

  return (
    <form className="submit-form" onSubmit={onSubmit} noValidate>
      <label>
        <span>{copy.form.fields.name.label}</span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={copy.form.fields.name.placeholder}
        />
      </label>

      <label>
        <span>{copy.form.fields.projectUrl.label}</span>
        <input
          name="projectUrl"
          type="url"
          required
          autoComplete="url"
          placeholder={copy.form.fields.projectUrl.placeholder}
        />
      </label>

      <label>
        <span>{copy.form.fields.problem.label}</span>
        <textarea
          name="problem"
          required
          rows={5}
          placeholder={copy.form.fields.problem.placeholder}
        />
      </label>

      <label>
        <span>{copy.form.fields.email.label}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={copy.form.fields.email.placeholder}
        />
      </label>

      <div className="honeypot" aria-hidden="true">
        <label>
          <span>Não preencha este campo</span>
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? copy.form.submitting : copy.form.submit}
      </button>

      {status === 'error' && errorMsg && (
        <p className="form-error" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
