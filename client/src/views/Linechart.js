import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Line } from "react-chartjs-2";
import { fetchViewupload } from "../actions//viewupload.actions";

const LineChart = () => {
    let ViewuploaddocumentList = useSelector((state) => state.Viewupload.viewUploadList);

    const emtyDetails = ViewuploaddocumentList.filter((o => o.category === " ")).length
    const PropertyDetails = ViewuploaddocumentList.filter((o => o.category === "Property Details")).length
    const itAsset = ViewuploaddocumentList.filter((o => o.category === "IT Asset")).length
    const businessDetails = ViewuploaddocumentList.filter((o => o.category === "Business Details")).length
    const personalDetails = ViewuploaddocumentList.filter((o => o.category === "Personal Details")).length

    const staticalCategoryValues = [emtyDetails, PropertyDetails, itAsset, businessDetails, personalDetails];

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchViewupload())
    }, [])

    const data = {
        labels: [
            "",
            "Property Details",
            "IT Asset",
            "Business Details",
            "Personal Details"
        ],
        datasets: [
            {
                label: "Insurance policies",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [emtyDetails, PropertyDetails, itAsset, businessDetails, personalDetails]
            }
        ]
    };
    const options = {
        title: {
            display: true,
            text: "Designing Cyber Insurance Policies"
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: Math.min(...staticalCategoryValues),
                        max: Math.max(...staticalCategoryValues) + 10,
                        stepSize: 10
                    }
                }
            ]
        }
    };
    return (
        <div className="content">
            <Line data={data} options={options} />
        </div>
    );
};
export default LineChart;
