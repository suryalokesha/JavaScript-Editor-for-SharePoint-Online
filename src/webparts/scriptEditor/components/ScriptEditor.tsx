import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export default function ScriptEditor() {
  const [script, setScript] = React.useState('');
  const [isAutoRun, setIsAutoRun] = React.useState(false);
  const [status, setStatus] = React.useState('Not Running');

  // Load saved data
  React.useEffect(() => {
    const savedScript = localStorage.getItem('customScript');
    const savedAutoRun = localStorage.getItem('autoRun');

    if (savedScript) setScript(savedScript);
    if (savedAutoRun === 'true') setIsAutoRun(true);
  }, []);

  // Auto run
  React.useEffect(() => {
    if (isAutoRun && script) {
      runScript();
    }
  }, [isAutoRun]);

  const runScript = () => {
    try {
      setStatus('Running...');
      eval(script);
      setStatus('Executed Successfully');
    } catch (error) {
      console.error('Script error:', error);
      setStatus('Error');
    }
  };

  const saveScript = () => {
    localStorage.setItem('customScript', script);
    localStorage.setItem('autoRun', isAutoRun.toString());
    setStatus('Saved');
  };

  return (
    <div>
      <h3>Custom Script Editor</h3>

      <textarea
        style={{
          width: '100%',
          height: '150px',
          border: '3px solid black',
          padding: '8px'
        }}
        value={script}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setScript(e.target.value)}
        placeholder="Enter JavaScript here..."
      />

      <div style={{ marginTop: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={isAutoRun}
            onChange={(e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => setIsAutoRun(e.target.checked)}
          />
          Run automatically on load
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={runScript}>Run Script</button>
        <button onClick={saveScript} style={{ marginLeft: '10px' }}>
          Save
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
}