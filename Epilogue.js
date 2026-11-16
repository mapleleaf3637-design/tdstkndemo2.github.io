import { imagePathFor } from '../config.js';

/** Future extension point for conservation and reflection. */
export function mountEpilogue(root, { onBack }) {
  root.innerHTML = `
    <section class="stage-screen" style="--stage-bg: url('${imagePathFor(9)}')">
      <div class="stage-backdrop" aria-hidden="true"></div>
      <header class="stage-topbar"><span>THE LOST ELEPHANT ARCHIVE</span><span>EPILOGUE</span><span class="stage-topbar__actions"><button type="button" class="game-fullscreen" data-fullscreen-toggle aria-label="Bật chế độ toàn màn hình" aria-pressed="false" title="Toàn màn hình">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" /></svg>
            </button></span></header>
      <div class="stage-card">
        <span class="eyebrow">EPILOGUE / CONSERVATION & REFLECTION</span>
        <h1>Tri thức dẫn lối <em>bảo tồn</em></h1>
        <p>Phần kết về bảo tồn voi và suy ngẫm của người chơi sẽ được bổ sung sau khi hoàn thiện hai Stage.</p>
        <button type="button" class="primary-button stage-back">← &nbsp; QUAY LẠI BẢN ĐỒ</button>
      </div>
    </section>
  `;
  const back = root.querySelector('.stage-back');
  back.addEventListener('click', onBack);
  return () => back.removeEventListener('click', onBack);
}
