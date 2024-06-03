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
                }
            });
        });

        // Tampilkan hasil dan jumlah list yang difilter
        document.getElementById('output').innerHTML = output;
        document.getElementById('filteredCount').innerHTML = `List Count: ${filteredCount}`; // Menampilkan jumlah list yang difilter
    } catch (error) {
        // Tampilkan pesan kesalahan jika JSON tidak valid
        document.getElementById('output').innerHTML = '<p style="color: red;">Invalid JSON data.</p>';
    }
}
