function convert() {
    // Ambil nilai input JSON
    const jsonData = document.getElementById('jsonInput').value;
    const startDateFilter = document.getElementById('startDateFilter').value;
    const endDateFilter = document.getElementById('endDateFilter').value;
    
    try {
        // Parse JSON
        const data = JSON.parse(jsonData);
        
        // Hasil output
        let output = '';
        let filteredCount = 0; // variabel untuk menghitung jumlah list yang difilter
        let accountNames = []; // array untuk menyimpan nama akun

        // Proses setiap item dalam data
        data.forEach(item => {
            item.string_list_data.forEach(account => {
                const date = new Date(account.timestamp * 1000); // Konversi timestamp ke milidetik
                
                // Filter berdasarkan rentang tanggal
                const startDate = new Date(startDateFilter);
                const endDate = new Date(endDateFilter);

                if ((!startDateFilter || date >= startDate) && (!endDateFilter || date <= endDate)) {
                    output += `<div class="card mb-3"><div class="card-body">`;
                    output += `<h5 class="card-title">Account name: ${account.value}</h5>`;
                    output += `<p class="card-text">Link: <a href="${account.href}" target="_blank">${account.href}</a></p>`;
                    output += `<p class="card-text">Date: ${date.toLocaleString()}</p>`;
                    output += `</div></div>`;
                    
                    filteredCount++; // Tambahkan jumlah list yang difilter
                    accountNames.push(account.value); // Tambahkan nama akun ke array
                }
            });
        });

        // Tampilkan hasil dan jumlah list yang difilter
        document.getElementById('output').innerHTML = output;
        document.getElementById('filteredCount').innerHTML = `<h2>List Count: ${filteredCount}</h2>`; // Menampilkan jumlah list yang difilter
        
        // Simpan nama akun di data atribut untuk digunakan oleh tombol salin
        document.getElementById('copyButton').dataset.accountNames = accountNames.join('\n');

        // Tampilkan tombol copy jika ada data yang difilter
        if (filteredCount > 0) {
            document.getElementById('copyButton').style.display = 'block';
        } else {
            document.getElementById('copyButton').style.display = 'none';
        }
    } catch (error) {
        // Tampilkan pesan kesalahan jika JSON tidak valid menggunakan SweetAlert
        swal("Error", "Invalid JSON data.", "error");
        document.getElementById('copyButton').style.display = 'none'; // Sembunyikan tombol salin jika ada kesalahan
    }
}

function copyAccountNames() {
    const accountNames = document.getElementById('copyButton').dataset.accountNames;
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = accountNames;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    swal("Success", "Account names copied to clipboard", "success");
}