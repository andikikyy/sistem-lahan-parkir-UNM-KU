// Inisialisasi slot parkir untuk mobil dan motor
let slotMobil = 20;
let slotMotor = 15;

// Akses elemen-elemen DOM yang diperlukan
const mobilSlot = document.getElementById('mobilSlot');
const motorSlot = document.getElementById('motorSlot');
const inputForm = document.getElementById('inputForm');
const parkingList = document.getElementById('parkingList');
const notification = document.getElementById('notification');

// Perbarui tampilan jumlah slot parkir yang tersedia
function updateSlotDisplay() {
    mobilSlot.textContent = slotMobil;
    motorSlot.textContent = slotMotor;
}

// Tambahkan kendaraan ke daftar parkir
function addVehicleToList(plat, jenis) {
    const listItem = document.createElement('li');
    listItem.textContent = `${plat} (${jenis})`;

    // Tambahkan tombol hapus
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.style.marginLeft = '10px';
    deleteButton.onclick = function() {
        removeVehicle(listItem, jenis);
    };

    listItem.appendChild(deleteButton);
    parkingList.appendChild(listItem);
}

// Hapus kendaraan dari daftar parkir
function removeVehicle(listItem, jenis) {
    parkingList.removeChild(listItem);

    // Kembalikan slot parkir berdasarkan jenis kendaraan
    if (jenis.toLowerCase() === 'mobil') {
        slotMobil++;
    } else if (jenis.toLowerCase() === 'motor') {
        slotMotor++;
    }

    // Perbarui tampilan slot parkir
    updateSlotDisplay();
    showNotification('Kendaraan berhasil dihapus!', 'success');
}

// Tampilkan pesan notifikasi
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.style.color = type === 'success' ? 'green' : 'red';
    setTimeout(() => {
        notification.textContent = '';
    }, 3000);
}

// Event listener untuk form submit
inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const plat = document.getElementById('plat').value;
    const jenis = document.getElementById('jenis').value;
    
    // Validasi apakah slot masih tersedia
    if (jenis.toLowerCase() === 'mobil') {
        if (slotMobil > 0) {
            slotMobil--;
            addVehicleToList(plat, 'Mobil');
            showNotification('Kendaraan berhasil ditambahkan!', 'success');
        } else {
            showNotification('Slot parkir mobil penuh!', 'error');
            return;
        }
    } else if (jenis.toLowerCase() === 'motor') {
        if (slotMotor > 0) {
            slotMotor--;
            addVehicleToList(plat, 'Motor');
            showNotification('Kendaraan berhasil ditambahkan!', 'success');
        } else {
            showNotification('Slot parkir motor penuh!', 'error');
            return;
        }
    }
    
    // Perbarui tampilan slot yang tersedia
    updateSlotDisplay();
    
    // Reset form setelah submit
    inputForm.reset();
});

// Inisialisasi tampilan slot parkir
updateSlotDisplay();

