// Sample data with links
const aroms = [
  { name: "LineageOS 22.x | iode 6.x | /e/OS-a15", url: "https://xdaforums.com/t/rom-unofficial-15-lineageos-22-x-iode-6-x-e-os-a15-for-samsung-galaxy-s7-s7-series.4726740/" },
  { name: "LineageOS (gts7l*)", url: "https://xdaforums.com/t/rom-official-lineageos-22-weeklies-for-galaxy-tab-s7-wifi-and-s7-lte.4746108/" },
  { name: "RisingOS Revived 7.0", url: "https://xdaforums.com/t/rom-unofficial-15-risingos-revived-7-0-for-tab-s7-wifi-5g-gts7xl-gts7xlwifi.4739117/" },
  { name: "Evolution X (gts7xl*)", url: "https://xdaforums.com/t/rom-t970-t976-16-0-evolution-x-for-tab-s7-wifi-5g.4723153/" },
  { name: "Evolution X (gts7lwifi)", url: "https://xdaforums.com/t/rom-16-0-gts7lwifi-unofficial-evolution-x-06-28-25.4724017/" },
];

// Sample data with links
const oroms = [
  { name: "TerracottaROM (SM-T97x)", url: "https://xdaforums.com/t/rom-15-gts7xl-gts7xlwifi-terracottarom-1-1-1-oneui-7-for-tab-s7-12-8-2025.4754402/" },
  { name: "ExtremeROM (SM-T870)", url: "https://xdaforums.com/t/rom-oneui-7-gts7lwifi-port-15-extremerom-nexus-v2-0-0-for-galaxy-tab-s7-wifi.4752952/" },
  { name: "J's UI8 ROM (SM-T970) (EOL)", url: "https://xdaforums.com/t/beta-jeys-oneui-8-rom-sm-t970-only.4751163/" },
  { name: "J's UI6 ROM (SM-T970) (EOL)", url: "https://xdaforums.com/t/beta-jeys-oneui-6-1-1-rom-aug-1-patch-7-11-2024-sm-t970-only-for-now.4701768/" },
];

const roots = [
  { name: "Magisk", url: "https://github.com/topjohnwu/magisk/releases/" },
  { name: "KernelSU (..._ksu.img)", url: "https://github.com/JeyKul/Release_Kernels/releases" }
];

const kernels = [
  { name: "Queen Kernel (gts7xlwifi)", url: "https://github.com/JeyKul/Release_Kernels/releases/gts7xlwifi" },
  { name: "Queen Kernel (gts7xl)", url: "https://github.com/JeyKul/Release_Kernels/releases/gts7xl" },
  { name: "Queen Kernel (gts7lwifi)", url: "https://github.com/JeyKul/Release_Kernels/releases/gts7lwifi" },
  { name: "Queen Kernel (gts7l)", url: "https://github.com/JeyKul/Release_Kernels/releases/gts7l" },
  { name: "Queen Kernel (r8q)", url: "https://github.com/JeyKul/Release_Kernels/releases/r8q" },
  { name: "Queen Kernel (c2q)", url: "https://github.com/JeyKul/Release_Kernels/releases/c2q" },
];

const modules = [
  { name: "Viper4Android", url: "https://github.com/WSTxda/ViperFX-RE-Releases" },
  { name: "AdAway", url: "https://github.com/AdAway/AdAway/releases" },
  { name: "PlayIntegrityFix-NEXT", url: "https://github.com/EricInacio01/PlayIntegrityFix-NEXT" }
];

const other = [
  { name: "(YouTube) How to install OneUI 6.1.1 (UN1CA)", url: "https://www.youtube.com/watch?v=d9Ck5v51jVs" },
];

// Populate lists with links
function populateList(id, items) {
  const list = document.getElementById(id);
  list.innerHTML = ""; // clear previous
  items.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.name;
    a.target = "_blank"; // open in new tab
    li.appendChild(a);
    list.appendChild(li);
  });
}

// Populate all lists
populateList("arom-list", aroms);
populateList("orom-list", oroms);
populateList("root-list", roots);
populateList("kernel-list", kernels);
populateList("module-list", modules);
populateList("other-list", other);