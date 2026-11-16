import { imagePathFor } from '../config.js';

/** Future extension point for conservation and reflection. */
export function mountEpilogue(root, { onBack }) {
  root.innerHTML = `
    <section class="stage-screen" style="--stage-bg: url('${imagePathFor(9)}')">
      <div class="stage-backdrop" aria-hidden="true"></div>
      <header class="stage-topbar"><span>THE LOST ELEPHANT ARCHIVE</span><span>EPILOGUE</span></header>
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
